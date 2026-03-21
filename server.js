const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const API_KEY = process.env.OPENAI_API_KEY || "";

app.use(express.json({ limit: "1mb" }));
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Luna server running at http://localhost:${PORT}`);
});
