const express = require("express");
const { DatabaseSync } = require("node:sqlite");
const path = require("path");

const app = express();
const db = new DatabaseSync(path.join(__dirname, "finance.db"));

// ── Schema ────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id       TEXT PRIMARY KEY,
    type     TEXT NOT NULL,
    amount   REAL NOT NULL,
    category TEXT NOT NULL,
    date     TEXT NOT NULL,
    note     TEXT DEFAULT ''
  )
`);

// ── Middleware ────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── Routes ────────────────────────────────────────────────────────────────

// GET all transactions
app.get("/api/transactions", (req, res) => {
  const rows = db.prepare("SELECT * FROM transactions ORDER BY date DESC, rowid DESC").all();
  res.json(rows);
});

// POST new transaction
app.post("/api/transactions", (req, res) => {
  const { id, type, amount, category, date, note } = req.body;

  if (!id || !type || !amount || !category || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    db.prepare(
      "INSERT INTO transactions (id, type, amount, category, date, note) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(id, type, amount, category, date, note ?? "");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  res.status(201).json({ ok: true });
});

// DELETE a transaction
app.delete("/api/transactions/:id", (req, res) => {
  const result = db.prepare("DELETE FROM transactions WHERE id = ?").run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

// ── Start ─────────────────────────────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Personal Finance running at http://localhost:${PORT}`);
});
