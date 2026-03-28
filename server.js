const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config({ override: false });

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const API_KEY = process.env.OPENAI_API_KEY || "";
const LOGIN_USER = process.env.LOGIN_USER || "";
const LOGIN_PASS = process.env.LOGIN_PASS || "";
/** Webhook URL（任意・外部へ JSON 転送）。LINE 送信先が別サーバーのとき。 */
const LINE_BRIDGE_URL = process.env.LINE_BRIDGE_URL || "";
const LINE_BRIDGE_SECRET = process.env.LINE_BRIDGE_SECRET || "";
/** Messaging API のチャンネルシークレット（リクエストごとに読み直し） */
function getLineChannelSecret() {
  let s = String(process.env.LINE_CHANNEL_SECRET || "")
    .replace(/^\uFEFF/, "")
    .trim();
  if (s) return s;
  const filePath = String(process.env.LINE_CHANNEL_SECRET_FILE || "").trim();
  if (filePath) {
    try {
      s = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "").trim();
      if (s) return s;
    } catch (_) {
      /* ignore */
    }
  }
  for (const p of ["/etc/secrets/LINE_CHANNEL_SECRET", "/run/secrets/line_channel_secret"]) {
    try {
      if (fs.existsSync(p)) {
        s = fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "").trim();
        if (s) return s;
      }
    } catch (_) {
      /* ignore */
    }
  }
  return "";
}

/** 診断用（値は出さない） */
function lineSecretEnvDiagnostics() {
  const hasKey = Object.prototype.hasOwnProperty.call(process.env, "LINE_CHANNEL_SECRET");
  const raw = hasKey ? String(process.env.LINE_CHANNEL_SECRET) : "";
  const len = raw.replace(/^\uFEFF/, "").trim().length;
  return { hasEnvKey: hasKey, nonEmptyLength: len };
}

function captureLineWebhookRawBody(req, res, next) {
  const chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", () => {
    req.body = chunks.length ? Buffer.concat(chunks) : Buffer.alloc(0);
    next();
  });
  req.on("error", (err) => next(err));
}

function verifyLineSignature(channelSecret, rawBuffer, signatureHeader) {
  if (!channelSecret || !signatureHeader || !Buffer.isBuffer(rawBuffer)) {
    return false;
  }
  const hash = crypto.createHmac("sha256", channelSecret).update(rawBuffer).digest("base64");
  const sig = String(signatureHeader).trim();
  if (hash.length !== sig.length) {
    return false;
  }
  try {
    return crypto.timingSafeEqual(Buffer.from(hash, "utf8"), Buffer.from(sig, "utf8"));
  } catch {
    return false;
  }
}

// Basic認証ミドルウェア
function basicAuth(req, res, next) {
  if (!LOGIN_USER || !LOGIN_PASS) return next();
  const authHeader = req.headers["authorization"] || "";
  const base64 = authHeader.replace(/^Basic\s+/i, "");
  const [user, pass] = Buffer.from(base64, "base64").toString().split(":");
  if (user === LOGIN_USER && pass === LOGIN_PASS) return next();
  res.set("WWW-Authenticate", 'Basic realm="My Page"');
  return res.status(401).send("認証が必要です");
}

// ヘルスチェック（Basic認証不要）
app.get("/ping", (req, res) => res.send("ok"));

/**
 * Webhook 用シークレットがこのプロセスで見えているか（値は返さない）
 * ブラウザで https://ホスト/line/webhook を開いて確認
 */
function lineWebhookGetHandler(req, res) {
  const configured = Boolean(getLineChannelSecret());
  const diag = lineSecretEnvDiagnostics();
  res.status(200).json({
    ok: true,
    channelSecretConfigured: configured,
    envKeyLINE_CHANNEL_SECRET: diag.hasEnvKey,
    /** 値の文字数のみ（中身は出しません）。0 なら Render の Value が空 */
    secretCharLength: diag.nonEmptyLength,
    postPath: "/line/webhook",
    message: configured
      ? "POST は LINE からのみ。ここは確認用の GET です。"
      : diag.hasEnvKey && diag.nonEmptyLength === 0
        ? "環境変数キーはあるが値が空です。Render で Value を入れ直し、前後にスペースや引用符が無いか確認してください。"
        : "LINE_CHANNEL_SECRET がこのプロセスに渡っていません。Render の Environment で Key 名を LINE_CHANNEL_SECRET にし、Save 後に必ず再デプロイしてください。",
  });
}
app.get("/line/webhook", lineWebhookGetHandler);
app.get("/line/webhook/", lineWebhookGetHandler);

function lineWebhookPostHandler(req, res) {
  const channelSecret = getLineChannelSecret();
  if (!channelSecret) {
    const diag = lineSecretEnvDiagnostics();
    console.warn(
      "[line/webhook] LINE_CHANNEL_SECRET empty",
      "hasKey=",
      diag.hasEnvKey,
      "len=",
      diag.nonEmptyLength
    );
    return res
      .status(503)
      .type("text/plain")
      .send(
        "LINE_CHANNEL_SECRET not configured on server. Add it in Render → Environment, then redeploy."
      );
  }
  const raw = Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0);
  const sig = req.get("x-line-signature");
  if (!verifyLineSignature(channelSecret, raw, sig)) {
    console.warn("[line/webhook] invalid X-Line-Signature");
    return res.status(401).send("Unauthorized");
  }
  try {
    if (raw.length > 0) {
      const payload = JSON.parse(raw.toString("utf8"));
      const events = Array.isArray(payload.events) ? payload.events : [];
      if (events.length > 0) {
        console.log(
          "[line/webhook]",
          events.length,
          "event(s):",
          events.map((e) => e.type).join(", ")
        );
      }
    }
  } catch (e) {
    console.warn("[line/webhook] JSON parse error:", e?.message);
    return res.status(400).send("Bad Request");
  }
  return res.status(200).json({});
}

/**
 * LINE Messaging API の Webhook（LINE Developers に登録する URL）
 * 例: https://xxx.onrender.com/line/webhook
 * express.raw の type 判定で本文が空になるケースを避け、ストリームを直接読む。
 */
app.post("/line/webhook", captureLineWebhookRawBody, lineWebhookPostHandler);
app.post("/line/webhook/", captureLineWebhookRawBody, lineWebhookPostHandler);

app.use(express.json({ limit: "1mb" }));

app.use(basicAuth);
app.use(express.static(path.join(__dirname)));

app.post("/api/luna", async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is not set",
      });
    }

    const { system, messages } = req.body || {};

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "messages must be an array",
      });
    }

    const normalizedMessages = [
      ...(typeof system === "string" && system.trim() ? [{ role: "system", content: system }] : []),
      ...messages.map((m) => ({
        role: m?.role || "user",
        content: typeof m?.content === "string" ? m.content : "",
      })),
    ];

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 600,
        temperature: 0.7,
        messages: normalizedMessages,
      }),
    });
    clearTimeout(timer);

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const reply = data?.choices?.[0]?.message?.content || "";
    // Keep the same response shape expected by index.html.
    return res.json({ content: [{ text: reply }] });
  } catch (error) {
    console.error("[Luna] Error:", error?.message || String(error));
    return res.status(500).json({
      error: "Failed to call OpenAI API",
      detail: error?.message || String(error),
    });
  }
});

app.get("/api/config", (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    /** フロントが LINE ブリッジ呼び出しを出すか（URL は出さない） */
    lineBridgeEnabled: Boolean(LINE_BRIDGE_URL),
  });
});

/**
 * ダッシュボードと同じ内容を外部（GAS → LINE 等）へ渡す。
 * body: { kind: "alerts" | "snapshot", ... }
 */
app.post("/api/line-bridge", async (req, res) => {
  try {
    if (!LINE_BRIDGE_URL) {
      return res.status(200).json({
        ok: false,
        skipped: true,
        reason: "LINE_BRIDGE_URL is not set",
      });
    }
    const payload = {
      ...(req.body && typeof req.body === "object" ? req.body : {}),
      source: "mypege",
      at: new Date().toISOString(),
    };
    const headers = { "Content-Type": "application/json" };
    if (LINE_BRIDGE_SECRET) {
      headers["X-Bridge-Secret"] = LINE_BRIDGE_SECRET;
    }
    const upstream = await fetch(LINE_BRIDGE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const text = await upstream.text();
    if (!upstream.ok) {
      console.warn("[line-bridge] upstream", upstream.status, text.slice(0, 300));
      return res.status(502).json({
        ok: false,
        upstreamStatus: upstream.status,
        detail: text.slice(0, 200),
      });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error("[line-bridge]", err?.message || err);
    return res.status(500).json({
      ok: false,
      error: err?.message || String(err),
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Luna server running at http://localhost:${PORT}`);
  if (!getLineChannelSecret()) {
    console.warn(
      "[line] Webhook POST /line/webhook returns 503 until LINE_CHANNEL_SECRET is set (Render env + redeploy)."
    );
  }
});
