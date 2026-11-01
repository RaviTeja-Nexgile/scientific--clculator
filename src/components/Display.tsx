import styles from "./Calculator.module.css";

export interface DisplayProps {
  /** The expression as the user is typing it. */
  expression: string;
  /** The last evaluated result, or null when there is none. */
  result: number | null;
  /** The current error message, or null when there is none. */
  error: string | null;
  /** The current angle mode, shown in the display area. */
  mode: "DEG" | "RAD";
}

/**
 * Format a numeric result for display, rounding away floating-point noise
 * (e.g. 0.49999999999999994 → 0.5, -0.9880316240928618 → -0.988) while
 * preserving integers exactly.
 */
function formatResult(value: number): string {
  // Round to 3 decimal places to remove floating-point representation error,
  // then strip any trailing zeros and a trailing decimal point.
  const rounded = Number(value.toFixed(3));
  return String(rounded);
}

export default function Display({ expression, result, error, mode }: DisplayProps) {
  let content: string;
  if (error !== null) {
    content = error;
  } else if (result !== null) {
    content = formatResult(result);
  } else if (expression === "") {
    content = "0";
  } else {
    content = expression;
  }

  return (
    <div className={styles.display} data-testid="display" aria-live="polite">
      <span className={styles.mode} data-testid="mode">
        {mode}
      </span>
      <span className={styles.value} data-testid="display-value">
        {content}
      </span>
    </div>
  );
}
