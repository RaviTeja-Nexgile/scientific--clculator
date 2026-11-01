# Tasks: Scientific Calculator

- [ ] 1. Project setup
  - _Requirements: 1.1_
  - _Files: package.json, tsconfig.json, vite.config.ts, index.html, src/main.tsx, src/App.tsx, src/styles/global.css, README.md, .gitignore, .env.example, e2e/.gitkeep_
  - _Verify: npm install && npm test_
  - _Verify: npm run build_
  - _Issue: #1_

- [ ] 2. Expression evaluator
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10_
  - _Depends: 1_
  - _Files: src/evaluator/evaluate.ts, src/evaluator/evaluate.test.ts_
  - _Verify: npm test -- evaluate_
  - _Issue: #2_

- [ ] 3. Calculator display and keypad
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_
  - _Depends: 2_
  - _Files: src/components/Display.tsx, src/components/Keypad.tsx, src/components/Calculator.tsx, src/components/Calculator.module.css, src/components/Calculator.test.tsx_
  - _Verify: npm test -- Calculator_
  - _Issue: #4_

- [ ] 4. Angle mode toggle
  - _Requirements: 3.1, 3.2, 3.3_
  - _Depends: 2_
  - _Files: src/components/AngleModeToggle.tsx, src/components/AngleModeToggle.module.css, src/components/AngleModeToggle.test.tsx_
  - _Verify: npm test -- AngleModeToggle_
  - _Issue: #5_

- [ ] 5. Memory functions
  - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - _Depends: 2_
  - _Files: src/components/MemoryButtons.tsx, src/components/MemoryButtons.module.css, src/components/MemoryButtons.test.tsx_
  - _Verify: npm test -- MemoryButtons_
  - _Issue: #6_

- [ ] 6. History panel
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  - _Depends: 2_
  - _Files: src/components/HistoryPanel.tsx, src/components/HistoryPanel.module.css, src/components/HistoryPanel.test.tsx_
  - _Verify: npm test -- HistoryPanel_
  - _Issue: #7_

- [ ] 7. Theme toggle
  - _Requirements: 6.1, 6.2_
  - _Depends: 1_
  - _Files: src/components/ThemeToggle.tsx, src/components/ThemeToggle.module.css, src/components/ThemeToggle.test.tsx_
  - _Verify: npm test -- ThemeToggle_
  - _Issue: #3_

- [ ] 8. Deployment setup
  - _Requirements: 1.9_
  - _Depends: 1, 2, 3, 4, 5, 6, 7_
  - _Files: netlify.toml_
  - _Verify: npm run build_
  - _Issue: #8_
