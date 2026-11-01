import { useCallback, useEffect, useState } from "react";
import { evaluate, type AngleMode } from "../evaluator/evaluate";
import Display from "./Display";
import Keypad from "./Keypad";
import styles from "./Calculator.module.css";

/** The angle mode is fixed to DEG until the angle-mode toggle task wires it. */
const DEFAULT_MODE: AngleMode = "DEG";

/**
 * The top-level calculator component. It owns the expression, result, error and
 * angle-mode state, wires the evaluator to the equals button, and handles
 * keyboard input.
 */
export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mode: AngleMode = DEFAULT_MODE;

  const append = useCallback((value: string) => {
    setExpression((prev) => prev + value);
    setResult(null);
    setError(null);
  }, []);

  const clear = useCallback(() => {
    setExpression("");
    setResult(null);
    setError(null);
  }, []);

  const deleteLast = useCallback(() => {
    setExpression((prev) => prev.slice(0, -1));
    setResult(null);
    setError(null);
  }, []);

  const equals = useCallback(() => {
    const value = evaluate(expression, mode);
    if (typeof value === "number") {
      setResult(value);
      setError(null);
    } else {
      setResult(null);
      setError(value.message);
    }
  }, [expression, mode]);

  // Keyboard input: digits, operators, Enter (=), Backspace (delete), Escape (clear).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (/^[0-9]$/.test(key)) {
        append(key);
        return;
      }
      if (key === ".") {
        append(".");
        return;
      }
      if (key === "+" || key === "-") {
        append(key);
        return;
      }
      if (key === "*") {
        append("×");
        return;
      }
      if (key === "/") {
        append("÷");
        return;
      }
      if (key === "%") {
        append("%");
        return;
      }
      if (key === "Enter" || key === "=") {
        equals();
        return;
      }
      if (key === "Backspace") {
        deleteLast();
        return;
      }
      if (key === "Escape") {
        clear();
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [append, clear, deleteLast, equals]);

  return (
    <div className={styles.calculator}>
      <Display expression={expression} result={result} error={error} mode={mode} />
      <Keypad
        onAppend={append}
        onEquals={equals}
        onClear={clear}
        onDelete={deleteLast}
      />
    </div>
  );
}
