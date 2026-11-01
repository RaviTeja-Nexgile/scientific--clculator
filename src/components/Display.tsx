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
 * Shows the expression as the user types it, the result after evaluation, the
 * current angle mode, and any error message.
 */
export default function Display({ expression, result, error, mode }: DisplayProps) {
  let content: string;
  if (error !== null) {
    content = error;
  } else if (result !== null) {
    content = String(result);
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
