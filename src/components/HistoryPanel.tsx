import styles from "./HistoryPanel.module.css";

/** A single past calculation: the expression and its numeric result. */
export interface HistoryEntry {
  expression: string;
  result: number;
}

/** The maximum number of calculations the history keeps. */
export const HISTORY_LIMIT = 50;

/**
 * Add a completed calculation to the history, most recent first, keeping only
 * the `HISTORY_LIMIT` most recent entries (criterion 5.1 and 5.5).
 */
export function addHistoryEntry(
  history: HistoryEntry[],
  entry: HistoryEntry,
): HistoryEntry[] {
  return [entry, ...history].slice(0, HISTORY_LIMIT);
}

export interface HistoryPanelProps {
  /** Past calculations, most recent first. */
  history: HistoryEntry[];
  /** Called when the user clicks a past calculation to reuse its expression. */
  onSelect: (entry: HistoryEntry) => void;
  /** Called when the user clears the history. */
  onClear: () => void;
}

/**
 * The list of past calculations, most recent first, with click-to-reuse and a
 * clear button (criteria 5.2, 5.3 and 5.4).
 */
export default function HistoryPanel({
  history,
  onSelect,
  onClear,
}: HistoryPanelProps) {
  return (
    <section className={styles.panel} aria-label="History">
      <header className={styles.header}>
        <h2 className={styles.title}>History</h2>
        <button
          type="button"
          className={styles.clear}
          onClick={onClear}
          disabled={history.length === 0}
        >
          Clear
        </button>
      </header>

      {history.length === 0 ? (
        <p className={styles.empty}>No calculations yet</p>
      ) : (
        <ol className={styles.list}>
          {history.map((entry, index) => (
            <li key={`${entry.expression}-${entry.result}-${index}`}>
              <button
                type="button"
                className={styles.entry}
                onClick={() => onSelect(entry)}
              >
                <span className={styles.expression}>{entry.expression}</span>
                <span className={styles.result}>= {entry.result}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
