# Tasks: Scientific Calculator

- [x] 1. Project setup
  - _Requirements: 1.1_
  - _Files: package.json, tsconfig.json, vite.config.ts, index.html, src/main.tsx, src/App.tsx, src/styles/global.css, README.md, .gitignore, .env.example, e2e/.gitkeep_
  - _Verify: npm install && npm test_
  - _Verify: npm run build_
  - _Issue: #1_

- [x] 2. Expression evaluator
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10_
  - _Depends: 1_
  - _Files: src/evaluator/evaluate.ts, src/evaluator/evaluate.test.ts_
  - _Verify: npm test -- evaluate_
  - _Issue: #2_

- [x] 3. Calculator display and keypad
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_
  - _Depends: 2_
  - _Files: src/components/Display.tsx, src/components/Keypad.tsx, src/components/Calculator.tsx, src/components/Calculator.module.css, src/components/Calculator.test.tsx_
  - _Verify: npm test -- Calculator_
  - _Issue: #4_

- [x] 4. Angle mode toggle
  - _Requirements: 3.1, 3.2, 3.3_
  - _Depends: 2_
  - _Files: src/components/AngleModeToggle.tsx, src/components/AngleModeToggle.module.css, src/components/AngleModeToggle.test.tsx_
  - _Verify: npm test -- AngleModeToggle_
  - _Issue: #5_

- [x] 5. Memory functions
  - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - _Depends: 2_
  - _Files: src/components/MemoryButtons.tsx, src/components/MemoryButtons.module.css, src/components/MemoryButtons.test.tsx_
  - _Verify: npm test -- MemoryButtons_
  - _Issue: #6_

- [x] 6. History panel
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  - _Depends: 2_
  - _Files: src/components/HistoryPanel.tsx, src/components/HistoryPanel.module.css, src/components/HistoryPanel.test.tsx_
  - _Verify: npm test -- HistoryPanel_
  - _Issue: #7_

- [x] 7. Theme toggle
  - _Requirements: 6.1, 6.2_
  - _Depends: 1_
  - _Files: src/components/ThemeToggle.tsx, src/components/ThemeToggle.module.css, src/components/ThemeToggle.test.tsx_
  - _Verify: npm test -- ThemeToggle_
  - _Issue: #3_

- [x] 8. Deployment setup
  - _Requirements: 1.9_
  - _Depends: 1, 2, 3, 4, 5, 6, 7_
  - _Files: netlify.toml_
  - _Verify: npm run build_
  - _Issue: #8_

- [ ] 9. Fix: rules that fail on the finished app
  - Greenfield tested the finished app, with every task built and merged, as a person uses it across its screens: these rules do not hold, although each task passed its own checks.
  - #2 “Expression evaluator”: The evaluator correctly handles division by zero, 0÷5, factorial of 5, and mismatched parentheses, but the keypad has no closing-parenthesis button and the keyboard handler ignores the ')' key, so expressions that require parentheses — sin(30), √(16), √(-4), and (-3)! — cannot be entered and always produce 'Mismatched parentheses'. Rule 2.1: Clicked sin (inserts 'sin('), then 3, 0, then =. The display showed 'Mismatched parentheses' instead of 0.5, because there is no ')' button on the keypad and the keyboard handler does not accept ')'. Rule 2.2: Same root cause as 2.1: sin(30) in RAD mode cannot be entered because the closing parenthesis cannot be typed; the expression 'sin(30' yields 'Mismatched parentheses' rather than -0.988. Rule 2.6: (-3)! cannot be entered: there is no '(' or ')' button and the keyboard handler ignores parentheses, so the expression required by the rule is unreachable through the UI. Rule 2.7: Clicked √ (inserts '√('), then -, 4, then =. The display showed 'Mismatched parentheses' instead of the square-root-of-negative error, because the closing parenthesis cannot be entered. Rule 2.8: Clicked √ (inserts '√('), then 1, 6, then =. The display showed 'Mismatched parentheses' instead of 4, because the closing parenthesis cannot be entered.
  - Fix the app so each of these rules holds end to end, as the Tester tried it. A rule often spans two tasks' screens, such as a message shown on one page after a save on another: change every part that needs it, whichever task wrote it, and keep those tasks' tests passing. Greenfield tests the finished app again once this task is merged.
  - _Requirements: 2.1, 2.2, 2.6, 2.7, 2.8_
  - _Files: **_
  - _Verify: npm test_
