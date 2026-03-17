# Personal Finance App — Requirements

## Overview

A simple, client-side web application for tracking personal income and expenses. No login, no server, no build tools required. Data persists in the browser via `localStorage`.

---

## User Stories

1. As a user, I can add a transaction so I can record my income or expenses.
2. As a user, I can view all my transactions in a list so I can see my history.
3. As a user, I can delete a transaction so I can correct mistakes.
4. As a user, I can see a monthly summary so I know my total income, total expenses, and net balance.

---

## Functional Requirements

### Transactions

- Each transaction has:
  - **Amount** (positive number, required)
  - **Type** (Income or Expense, required)
  - **Category** (selected from a fixed list, required)
  - **Date** (defaults to today, required)
  - **Note** (free text, optional)
- Users can add a new transaction via a form.
- Users can delete any transaction.
- No editing — delete and re-add if correction needed.

### Categories

Fixed list, not user-configurable:

| Income | Expense |
|--------|---------|
| Salary | Rent |
| Freelance | Food |
| Other Income | Transport |
| | Entertainment |
| | Health |
| | Utilities |
| | Other |

### Summary (Current Month)

Displayed at the top of the page:
- Total Income
- Total Expenses
- Net Balance (Income − Expenses)

### Transaction List

- Sorted by date, most recent first.
- Each row shows: date, category, note (if any), amount, delete button.
- Income and expense amounts are visually distinguished (e.g. green / red).

---

## Non-Functional Requirements

- Runs entirely in the browser — no server, no build step.
- Data stored in `localStorage`; persists across page refreshes.
- Works on desktop browsers (Chrome, Firefox, Safari).
- Mobile-friendly layout.

---

## Out of Scope

- User accounts or authentication
- Budgets or savings goals
- Charts or graphs
- Bank/CSV import
- Recurring transactions
- Multi-currency support
- Editing transactions (only add / delete)
- Custom categories

---

## Tech Stack

- HTML, CSS, vanilla JavaScript
- No frameworks, no dependencies, no build tools
- Single `index.html` file (styles and scripts inline or in separate files)
