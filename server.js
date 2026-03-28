const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const API_KEY = process.env.OPENAI_API_KEY || "";
const LOGIN_USER = process.env.LOGIN_USER || "";
const LOGIN_PASS = process.env.LOGIN_PASS || "";
/** Webhook URL（例: Google Apps Script のデプロイ URL）。LINE 送信は GAS 側で行う。 */
const LINE_BRIDGE_URL = process.env.LINE_BRIDGE_URL || "";
const LINE_BRIDGE_SECRET = process.env.LINE_BRIDGE_SECRET || "";

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

app.use(express.json({ limit: "1mb" }));

// ヘルスチェック（Basic認証不要）
app.get("/ping", (req, res) => res.send("ok"));

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
});
