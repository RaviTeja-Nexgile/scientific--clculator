# Design: Scientific Calculator

## Overview

A single-page scientific calculator web app built with React and TypeScript. It runs entirely in the browser with no backend and no database: the expression, result, history and memory live only in React state while the page is open, and nothing is kept between visits. The app is deployed to Netlify as a static site.

The calculator shows a display above a keypad of digit, operator and scientific-function buttons, with a DEG/RAD toggle, a theme toggle, memory buttons and a history panel. It supports keyboard input and a dark/light theme.

## Architecture

A single React app with no routing beyond the root page. All calculation logic is a pure TypeScript module, separate from the UI, so it can be unit-tested without a browser.

- **Expression evaluator** — a pure function that parses and evaluates an expression string into a number, or returns a typed error. It owns the calculation rules (operator precedence, angle mode, factorial, square root, division by zero).
- **Calculator state** — React state holding the current expression, the last result, the angle mode, the theme, the memory value and the history list.
- **UI components** — the display, the keypad, the history panel and the toggles, all driven by the state and the evaluator.

```
[ Keypad / Keyboard ] --> [ Calculator state ] --> [ Display / History ]
                                  |
                                  v
                        [ Expression evaluator ]
```

## Components and Interfaces

- `evaluate(expression: string, mode: "DEG" | "RAD"): number | EvalError` — the pure evaluator. It returns a number on success or an `EvalError` (a discriminated union with a message) on failure, covering division by zero, square root of a negative number, factorial of a non-integer or negative number, and invalid expressions such as mismatched parentheses.
- `Calculator` — the top-level component that owns the state and renders the display, keypad, history panel and toggles.
- `Display` — shows the expression as the user types it, the result after evaluation, the current angle mode, and any error message.
- `Keypad` — the grid of digit, operator, scientific-function and control buttons.
- `HistoryPanel` — the list of past calculations, most recent first, with click-to-reuse and clear.
- `MemoryButtons` — store, recall and clear for the single memory value.

## Data Models

All state is in memory only, held in React state:

- `expression: string` — the expression as the user is typing it.
- `result: number | null` — the last evaluated result.
- `error: string | null` — the current error message, if any.
- `mode: "DEG" | "RAD"` — the angle mode.
- `theme: "dark" | "light"` — the current theme.
- `memory: number | null` — the single stored memory value, or null when empty.
- `history: { expression: string; result: number }[]` — up to 50 past calculations, most recent first.

## Error Handling

The evaluator returns a typed error rather than throwing. The UI shows the error message in the display and keeps the expression so the user can correct it. The error cases are: division by zero, square root of a negative number, factorial of a negative or non-integer number, and invalid expressions such as mismatched parentheses.

## Testing Strategy

- **Unit tests** for the evaluator cover every calculation rule and error case in the acceptance criteria, including the worked examples (`sin(30)` in DEG and RAD, `5 ÷ 0`, `0 ÷ 5`, `5!`, `(-3)!`, `√(-4)`, `√(16)`).
- **Component tests** cover the UI behaviour: clicking buttons updates the display, the toggles switch mode and theme, memory store/recall/clear, and history add/reuse/clear/cap.
- **End-to-end journeys** (Playwright) are saved by Greenfield's Tester and run only through `run_journeys`; the unit test runner excludes the `e2e/` folder.

## Look and feel

A clean, modern calculator in the style of a physical scientific calculator: a display above a keypad, with the scientific functions in a secondary row or panel above the basic keypad.

- **Colours** (CSS variables, dark theme default):
  - Background: `#0f1115`
  - Surface (keypad/panels): `#1a1d24`
  - Text: `#e6e8ec`
  - Primary (equals and main actions): `#4f8cff`
  - Error: `#ff5c5c`
  - Success: `#34c77b`
  - Light theme: background `#f5f6f8`, surface `#ffffff`, text `#1a1d24`, primary `#2f6bff`.
- **Font**: a system sans-serif stack (`-apple-system, "Segoe UI", Roboto, sans-serif`), with the display in a larger, tabular-numeral style.
- **Spacing and radius**: 8px base spacing, 12px corner radius on buttons and panels.
- **Buttons**: rounded, with a subtle pressed state (darker/lighter fill), a focus ring on keyboard focus, and a dimmed disabled state. Operators and scientific functions use a muted surface; the equals button uses the primary colour.
- **Layout**: on a phone, a single column with the display on top and the keypad filling the width; on a desktop, the calculator is centred in a card with the history panel to the side.

## Build and run

Install: npm install
Test: npm test
Run locally: yes
Dev: npm run dev
Port variable: PORT
Health path: /
Deploy: netlify
