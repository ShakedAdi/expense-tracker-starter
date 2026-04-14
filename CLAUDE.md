# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

There is no test suite in this project.

## Architecture

The app is composed of six components with no routing or external state management:

- **`App`** — holds the single source of truth: `transactions` array (`{ id, description, amount, type, category, date }`). Passes data and callbacks down to children. Handles `handleAdd` and `handleDelete`.
- **`Summary`** (`src/Summary.jsx`) — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally, and renders the three summary cards.
- **`TransactionForm`** (`src/TransactionForm.jsx`) — owns its own form state (`description`, `amount`, `type`, `category`). Calls `onAdd(transaction)` prop on submit; `App` appends the new transaction to state.
- **`TransactionList`** (`src/TransactionList.jsx`) — receives `transactions` and `onDelete`, owns its own filter state (`filterType`, `filterCategory`), and renders the filtered table with per-row delete buttons.
- **`SpendingChart`** (`src/SpendingChart.jsx`) — receives `transactions`, aggregates expense amounts by category, and renders a recharts `BarChart` (purple bars).
- **`IncomeChart`** (`src/IncomeChart.jsx`) — receives `transactions`, aggregates income amounts by category, and renders a recharts `BarChart` (green bars).

**Known issues (intentional for the course):**
- Transaction #4 ("Freelance Work") is typed as `"expense"` but categorized as `"salary"`.
- Styling is minimal/unstyled.
