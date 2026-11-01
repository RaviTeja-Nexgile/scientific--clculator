# Requirements: Scientific Calculator

## Requirement 1: Calculator display and keypad

**User Story:** As a User, I want a calculator with a display above a keypad of digit and operator buttons, so that I can enter and see an expression as I type it.

_Source: G1, G2, G3, W1, EV1, N2_

### Acceptance Criteria

1. WHEN the app opens at `/` THE SYSTEM SHALL show a display above a keypad of digit buttons (0–9), a decimal point, and operator buttons for addition, subtraction, multiplication, division, percentage, and square root.
2. WHEN the User clicks a digit or operator button THE SYSTEM SHALL add that digit or operator to the expression shown in the display.
3. WHEN the User clicks the equals button THE SYSTEM SHALL evaluate the expression and show the result in the display.
4. WHEN the User clicks the clear button THE SYSTEM SHALL remove the whole expression from the display.
5. WHEN the User clicks the delete button THE SYSTEM SHALL remove the last character of the expression in the display.
6. WHEN the User presses a digit, operator, Enter, Backspace, or Escape key on the keyboard THE SYSTEM SHALL do the same as clicking the matching button.
7. WHEN the User clicks a scientific function button (sin, cos, tan, log, ln, power, factorial, π, or e) THE SYSTEM SHALL add that function or constant to the expression in the display.
8. WHEN the User clicks the equals button THE SYSTEM SHALL complete the calculation within 100 milliseconds on a standard laptop.
9. WHEN the app is opened at `/` THE SYSTEM SHALL be available to serve the calculator 99% of the time.

## Requirement 2: Calculation accuracy and error handling

**User Story:** As a User, I want calculations to be accurate and errors to be shown clearly, so that I can trust the result and know what went wrong.

_Source: G5, BR1, BR2, BR3, BR4, W1, N1_

### Acceptance Criteria

1. WHEN the User evaluates `sin(30)` in DEG mode THE SYSTEM SHALL show `0.5`.
2. WHEN the User evaluates `sin(30)` in RAD mode THE SYSTEM SHALL show `-0.988`.
3. WHEN the User evaluates `5 ÷ 0` THE SYSTEM SHALL show an error message.
4. WHEN the User evaluates `0 ÷ 5` THE SYSTEM SHALL show `0`.
5. WHEN the User evaluates `5!` THE SYSTEM SHALL show `120`.
6. WHEN the User evaluates `(-3)!` THE SYSTEM SHALL show an error message.
7. WHEN the User evaluates `√(-4)` THE SYSTEM SHALL show an error message.
8. WHEN the User evaluates `√(16)` THE SYSTEM SHALL show `4`.
9. WHEN the User enters an invalid expression, such as mismatched parentheses, THE SYSTEM SHALL show an error message.
10. WHEN the User clicks the equals button THE SYSTEM SHALL complete the calculation within 100 milliseconds on a standard laptop.

## Requirement 3: Angle mode toggle

**User Story:** As a User, I want to switch between DEG and RAD modes, so that trigonometric calculations use the angle unit I choose.

_Source: G4, W3, EV2, BR1_

### Acceptance Criteria

1. WHEN the User clicks the DEG/RAD toggle THE SYSTEM SHALL switch the angle mode between DEG and RAD.
2. WHEN the angle mode changes THE SYSTEM SHALL show the current mode (DEG or RAD) in the display area.
3. WHEN the User evaluates a trigonometric expression THE SYSTEM SHALL evaluate it using the selected angle mode.

## Requirement 4: Memory functions

**User Story:** As a User, I want to store and recall one value in memory, so that I can reuse a result later.

_Source: G4, W2, EV5, EV6, E2_

### Acceptance Criteria

1. WHEN the User clicks the memory store button THE SYSTEM SHALL store the current result in memory.
2. WHEN the User clicks the memory recall button and a value is stored THE SYSTEM SHALL insert the stored value into the expression.
3. WHEN the User clicks the memory recall button and no value is stored THE SYSTEM SHALL do nothing to the expression.
4. WHEN the User clicks the memory clear button THE SYSTEM SHALL remove the stored value from memory.

## Requirement 5: Calculation history

**User Story:** As a User, I want to see and reuse past calculations, so that I can go back to a previous result.

_Source: G4, W4, E1_

### Acceptance Criteria

1. WHEN the User completes a calculation THE SYSTEM SHALL add the expression and its result to the history.
2. WHEN the User opens the history panel THE SYSTEM SHALL show the list of past calculations, most recent first.
3. WHEN the User clicks a past calculation THE SYSTEM SHALL load its expression into the current input.
4. WHEN the User clears the history THE SYSTEM SHALL remove all past calculations from the list.
5. WHEN the history holds 50 calculations and a new calculation completes THE SYSTEM SHALL keep the 50 most recent calculations.

## Requirement 6: Theme

**User Story:** As a User, I want a dark and a light theme, so that the calculator is comfortable to use in different lighting.

_Source: G1, G5, F1_

### Acceptance Criteria

1. WHEN the app opens THE SYSTEM SHALL show the calculator in one theme (dark or light).
2. WHEN the User clicks the theme toggle THE SYSTEM SHALL switch the calculator between the dark and light theme.

## Later releases

- S1 Graphing functions
- S2 Equation solving
- S3 Complex number calculations
- S4 Unit conversions
- S5 Programming functions

## Assumptions

- The calculator keeps history and memory only while the page is open, and stores nothing between visits.
- The app is used by one person at a time on their own device, with no sign-in.
- The app is in English only and works on desktop and mobile browsers.
