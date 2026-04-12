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

This is a single-file React app. All logic and UI lives in `src/App.jsx` — there are no sub-components, routing, or external state management.

**Key state in `App`:**
- `transactions` — array of `{ id, description, amount, type, category, date }`. Note: `amount` is stored as a string (a known bug — arithmetic on it produces incorrect totals).
- `filterType` / `filterCategory` — control which transactions are shown in the table.

**Known issues (intentional for the course):**
- `amount` is never parsed to a number, so `totalIncome`, `totalExpenses`, and `balance` calculations are wrong.
- Transaction #4 ("Freelance Work") is typed as `"expense"` but categorized as `"salary"`.
- No delete functionality on transactions.
- Styling is minimal/unstyled.
