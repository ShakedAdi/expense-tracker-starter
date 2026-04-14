---
name: Codebase Patterns
description: Recurring patterns, anti-patterns, and architectural observations found across the expense tracker components during first full review (2026-04-14)
type: project
---

## Architecture
- App.jsx is the single source of truth. All state flows down via props; no Context, no Redux.
- CategoryChart is a reusable component (refactored from SpendingChart + IncomeChart) — accepts `type`, `title`, `color`, `emptyMessage` props.
- TransactionForm owns its own local form state. TransactionList owns its own filter state.
- No test suite exists. No routing. Stack: React + Vite + recharts + ESLint.

## Known Intentional Bug
- Transaction #4 ("Freelance Work") has `type: "expense"` but `category: "salary"` — this causes it to appear in the expense list and expense chart, not income. It is deliberately wrong for the course.

## Recurring Anti-Patterns Found
- `categories` array is duplicated in both TransactionForm.jsx and TransactionList.jsx — should be extracted to a shared constants file.
- No `useMemo` used anywhere — Summary, CategoryChart, and TransactionList all recompute on every render. Not critical at current scale but worth noting.
- `handleAdd` in App.jsx uses spread over stale `transactions` reference instead of the functional updater form `setTransactions(prev => [...prev, transaction])`.
- `Date.now()` used as transaction ID — collision risk is negligible in a single-user app but not semantically meaningful.
- No input validation beyond empty-string/falsy check in TransactionForm — negative amounts and non-numeric edge cases are not guarded.
- `window.confirm()` used for delete confirmation — blocks the main thread and is not styleable; a React modal would be more idiomatic.
- No `aria-label` on the delete button (`×` character only) and no `<label>` elements on form inputs — accessibility gaps.
- Inline styles used in CustomTooltip (CategoryChart.jsx) — CSS variables from App.css are not reused there.
- CSS class `.balance-amount` does not change color based on sign — a negative balance renders in neutral `--text-primary` rather than red.
- The `<Cell>` loop in CategoryChart uses array index `i` as the key — acceptable here since all cells are the same color, but worth flagging.
- `color` prop in CategoryChart assumes a 6-digit hex string — no validation; a 3-digit hex or named color would silently break the rgba cursor calculation.

## Style / Conventions
- Component files use `.jsx` extension consistently.
- CSS is all in a single App.css with CSS custom properties (design tokens) for the dark "Obsidian Ledger" theme.
- h2 labels inside panels are styled as small-caps section labels (12px, uppercase, letter-spacing).
- No PropTypes or TypeScript — no type safety at the prop boundary.
