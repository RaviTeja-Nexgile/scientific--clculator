import { useState } from "react";
import styles from "./AngleModeToggle.module.css";

export type AngleMode = "DEG" | "RAD";

interface AngleModeToggleProps {
  /** The current angle mode. When omitted, the component manages its own state. */
  mode?: AngleMode;
  /** Called with the next mode when the toggle is clicked. */
  onModeChange?: (mode: AngleMode) => void;
}

/**
 * A DEG/RAD toggle for the scientific calculator.
 *
 * It shows the current angle mode and switches between DEG and RAD on click.
 * By default it manages its own state (starting in DEG); pass `mode` and
 * `onModeChange` to lift the state into a parent such as the Calculator.
 */
export default function AngleModeToggle({ mode, onModeChange }: AngleModeToggleProps) {
  const [internalMode, setInternalMode] = useState<AngleMode>("DEG");
  const current = mode ?? internalMode;

  const toggle = () => {
    const next: AngleMode = current === "DEG" ? "RAD" : "DEG";
    if (onModeChange) {
      onModeChange(next);
    } else {
      setInternalMode(next);
    }
  };

  return (
    <div className={styles.container} data-testid="angle-mode-toggle">
      <span className={styles.mode} data-testid="angle-mode-display" aria-live="polite">
        {current}
      </span>
      <button
        type="button"
        className={styles.toggle}
        onClick={toggle}
        aria-label="Toggle angle mode"
        aria-pressed={current === "RAD"}
      >
        DEG/RAD
      </button>
    </div>
  );
}
