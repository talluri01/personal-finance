# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git workflow

After completing any meaningful piece of work, commit and push immediately so progress is never lost:

```bash
git add <files>
git commit -m "short, descriptive message"
git push
```

Commit message conventions:
- Use imperative mood: "Add summary tab" not "Added summary tab"
- Scope to what changed: one feature or fix per commit
- Never batch unrelated changes into a single commit

## Commands

```bash
npm install       # install dependencies (first time only)
npm start         # start the server at http://localhost:3000
```

No test runner or linter is configured.

## Architecture

This is a two-layer local web app:

- **`server.js`** — Express HTTP server. Serves static files from `public/` and exposes a JSON REST API:
  - `GET /api/transactions` — returns all rows ordered by date desc
  - `POST /api/transactions` — inserts a new row
  - `DELETE /api/transactions/:id` — deletes by id

- **`finance.db`** — SQLite database file (auto-created on first run). Single table: `transactions(id TEXT, type TEXT, amount REAL, category TEXT, date TEXT, note TEXT)`. Uses Node's built-in `node:sqlite` module (`DatabaseSync`) — no external SQLite npm package.

- **`public/index.html`** — Single-page frontend. No framework, no build step. All JS is inline at the bottom of the file. Communicates with the backend via `fetch`. Key globals:
  - `CATEGORIES` — static object mapping type → category list
  - `window._allTransactions` — cache of the last fetched transaction list, used by the filter dropdown
  - `refresh()` — fetches all transactions and re-renders both the list and summary

## UI structure

The UI has two tabs (Summary / Transactions) toggled by `[data-tab]` buttons and `[data-section]` divs. The Summary tab shows current-month income, expense, and balance. The Transactions tab shows the filterable list and the Add Transaction form.
