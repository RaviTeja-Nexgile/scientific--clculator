import { useState } from "react";

type Operator = "+" | "-" | "×" | "÷" | "%" | "√";

const DIGITS = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];
const OPERATORS: Operator[] = ["+", "-", "×", "÷", "%", "√"];

export default function App() {
  const [expression, setExpression] = useState("");

  const append = (value: string) => {
    setExpression((prev) => prev + value);
  };

  return (
    <div className="calculator">
      <div className="display" data-testid="display" aria-live="polite">
        {expression || "0"}
      </div>
      <div className="keypad">
        <div className="keypad-digits">
          {DIGITS.map((digit) => (
            <button
              key={digit}
              type="button"
              className="key"
              onClick={() => append(digit)}
            >
              {digit}
            </button>
          ))}
        </div>
        <div className="keypad-operators">
          {OPERATORS.map((operator) => (
            <button
              key={operator}
              type="button"
              className="key key-operator"
              onClick={() => append(operator)}
            >
              {operator}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
