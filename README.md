# Scientific Calculator

A modern scientific calculator web app built with React and TypeScript. It runs entirely in the browser with no backend: the expression, result, history and memory live only in React state while the page is open.

## Features

- Basic operations: addition, subtraction, multiplication, division, percentage, square root
- Scientific functions: sin, cos, tan, log, ln, powers, factorial, π, e
- DEG/RAD angle mode toggle
- Memory store / recall / clear
- Calculation history (most recent first, up to 50 entries)
- Dark / light theme
- Keyboard input

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm test` — run the unit tests (Vitest)

## Tech stack

- React 18 + TypeScript
- Vite
- Vitest + Testing Library

## Deployment

Deployed to Netlify as a static site. The production build is the `dist/` folder produced by `npm run build`.
