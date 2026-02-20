const path = require("path");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const app = express();
const port = Number(process.env.PORT || 3205);
const host = process.env.HOST || "127.0.0.1";
const staticDir = __dirname;
const startedAt = new Date().toISOString();

app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "consulting.sylvestri.cloud",
    startedAt,
    now: new Date().toISOString()
  });
});

app.get("/api/highlights", (_req, res) => {
  res.json({
    highlights: [
      "Production-ready AI architecture",
      "Custom agent workflows",
      "Automation and integrations",
      "Executive and team coaching"
    ]
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, goals } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ ok: false, error: "name and email are required" });
  }

  console.log("[contact-intake]", {
    at: new Date().toISOString(),
    name,
    email,
    goals: goals || ""
  });

  return res.status(202).json({ ok: true, message: "Request received" });
});

app.use(express.static(staticDir, { extensions: ["html"] }));

app.get("*", (_req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

app.listen(port, host, () => {
  console.log(`consulting web app listening on http://${host}:${port}`);
});
