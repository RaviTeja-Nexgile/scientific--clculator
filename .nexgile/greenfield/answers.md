# Requirements brief — Scientific Calculator
## Profile
A modern scientific calculator web app with calculation history, memory functions, and a dark/light theme. · web app · scientific calculator · size: small · depth: standard
- **Has a user interface?** Yes (It is a calculator application with a user interface.)
- **Runs locally?** Yes (The app serves a web page that can be started locally with a development server.)
## The app
A modern scientific calculator web app that performs basic and scientific calculations with history, memory functions, and DEG/RAD modes. It runs in the browser with a responsive dark/light theme and keyboard support, built with React and TypeScript and deployed to Netlify.
## Goals and success
- G1 Provide a modern, fully functional scientific calculator with a clean, attractive, responsive user interface. (description)
- G2 Support basic operations: addition, subtraction, multiplication, division, percentages, and square roots. (description)
- G3 Support scientific functions: sin, cos, tan, log, ln, powers, factorial, π, e, and trigonometric calculations. (description)
- G4 Include calculation history, memory functions, DEG/RAD modes, clear, delete, and keyboard support. (description)
- G5 Build with accurate calculations, smooth interactions, error handling, and a beautiful dark/light theme. (description)
- M1 A calculation completes in under 100 milliseconds on a standard laptop (100) [assumed] (assumption)
## Roles
- R1 User (1) [never signs in to the app] (description)
## Business events
- EV1 User presses a key or clicks a button (description)
- EV2 User switches between DEG and RAD mode (description)
- EV3 User clears the current expression (description)
- EV4 User deletes the last character (description)
- EV5 User stores a value in memory (description)
- EV6 User recalls a value from memory (description)
## Workflows
### W1 Perform a calculation (release 1) — actors: R1 User; trigger: User enters an expression; outcome: Result displayed and added to history; how often: Several times per session (description, Q2, assumption)
1. User enters an expression
2. App shows the expression as the user types it
3. App evaluates the expression
4. App displays the result
5. App adds the calculation to history
- X1 A calculation is impossible, like dividing by zero: Show an error message (Q3)
- X2 User enters an invalid expression, like mismatched parentheses [assumed] (assumption)
- X3 User enters a number too large to calculate [assumed] (assumption)
### W2 Use memory functions (release 1) — actors: R1 User; trigger: User wants to store or recall a value; outcome: Stored value is available for later use; how often: Occasionally (description, assumption)
1. User calculates a value
2. User presses the memory store button
3. App stores the value in memory
4. User continues calculating
5. User presses the memory recall button
6. App inserts the stored value into the expression
- X4 Memory is empty when user tries to recall [assumed] (assumption)
### W3 Switch angle mode (release 1) — actors: R1 User; trigger: User needs to calculate in degrees or radians; outcome: Trigonometric calculations use the correct angle unit; how often: Occasionally (description, assumption)
1. User taps the DEG/RAD toggle
2. App switches the angle mode
3. App shows the current mode
4. User enters a trigonometric expression
5. App evaluates using the selected mode
### W4 View calculation history (release 1) — actors: R1 User; trigger: User wants to see a previous calculation; outcome: Past calculation is available for reuse; how often: Occasionally (description, assumption)
1. User opens the history panel
2. App shows the list of past calculations
3. User taps a past calculation
4. App loads the expression into the current input
## Records
- E1 Calculation history. fields: expression, result; states: visible → cleared; owner: User; how many: 50; kept for: Only while the page is open (description, Q1, assumption)
- E2 Memory. fields: value; states: empty → stored; owner: User; how many: 1 (description, Q4, assumption)
## Rules
- BR1 Trigonometric functions use the selected angle mode. Applies: sin(30) equals 0.5 in DEG mode. Does not apply: sin(30) equals -0.988 in RAD mode (description, assumption)
- BR2 Division by zero shows an error. Applies: 5 ÷ 0 shows an error message. Does not apply: 0 ÷ 5 equals 0 (Q3, assumption)
- BR3 Factorial only applies to non-negative integers. Applies: 5! equals 120. Does not apply: (-3)! shows an error [assumed] (assumption)
- BR4 Square root of a negative number shows an error. Applies: √(-4) shows an error. Does not apply: √(16) equals 4 [assumed] (assumption)
## Quality targets
- N1 [performance] A calculation completes in under 100 milliseconds: 100 milliseconds [assumed] (assumption)
- N2 [availability] The app is available 99% of the time: 99 percent [assumed] (assumption)
## Scope and constraints
- S6 The app must run in a web browser [constraint] (description)
## Decisions
- **Stack:** React with TypeScript (decided by Greenfield; suggested: React with TypeScript provides strong typing, component reusability, and a large ecosystem for building a responsive calculator.) (Q6)
- **Deploy target:** Netlify (decided by Greenfield; suggested: Netlify offers simple static site hosting with automatic HTTPS and easy deployment from Git.) (Q7)
## Assumptions
- A1 The calculator will not include graphing, equation solving, complex numbers, unit conversions, or programming functions. — These features are beyond the scope of a scientific calculator and would add complexity without being requested. [assumed] (assumption, Q5)
## Conflicts
- C1 E2 Memory: volume "0" (description) or "1" (Q4)? [open] (description, Q4)
## Other facts
- F1 The app has a dark/light theme. [look] (description)
- F2 The app supports keyboard input. [devices] (description)
- F3 Today people use physical scientific calculators or basic phone calculators [current] [assumed] (assumption)
- F4 The top pain is switching between a basic calculator and a scientific one [current] [assumed] (assumption)
- F5 No existing data needs to be migrated [current] [assumed] (assumption)
- F6 The app is used by one person at a time on their own device [scale] [assumed] (assumption)
- F7 No sign-in is required [security] [assumed, high impact] (assumption)
- F8 The app is in English only [access_i18n] [assumed] (assumption)
- F9 The app works on desktop and mobile browsers [devices] [assumed] (assumption)
- F10 The app requires an internet connection to load [devices] [assumed] (assumption)
## Out of scope and later releases
- S1 Graphing functions [out of scope] [assumed] (Q5)
- S2 Equation solving [out of scope] [assumed] (Q5)
- S3 Complex number calculations [out of scope] [assumed] (Q5)
- S4 Unit conversions [out of scope] [assumed] (Q5)
- S5 Programming functions [out of scope] [assumed] (Q5)
## The interview
- Q1 [entities · owner] Should the calculator keep history between visits, or only while the page is open? → Only while the page is open
- Q2 [workflows · owner] Should the calculator show the expression as you type it, or only the result? → Show the expression as I type
- Q3 [exceptions · owner] When a calculation is impossible, like dividing by zero, what should happen? → Show an error message
- Q4 [entities · owner] Should the memory functions store one value, or several? → One value
- Q5 [scope · owner] What should the calculator deliberately not do, even though some calculators offer it? → Decide for me (settled: The calculator will not include graphing, equation solving, complex numbers, unit conversions, or programming functions.)
## Decided by Greenfield (Enough, decide the rest)
- Q6 Which technology stack should the calculator use? → Decide for me (settled: React with TypeScript)
- Q7 Where should the calculator be deployed? → Decide for me (settled: Netlify)
