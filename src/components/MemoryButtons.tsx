import { useState } from "react";
import styles from "./MemoryButtons.module.css";

export interface MemoryButtonsProps {
  /** The current calculation result, or null when there is none to store. */
  result: number | null;
  /** Called with the stored value when the user recalls memory. */
  onRecall: (value: number) => void;
}

/**
 * Store, recall and clear for the calculator's single memory value.
 *
 * The memory value is held in local state and lives only while the page is
 * open. "Store" copies the current result into memory; "recall" hands the
 * stored value back to the parent (which inserts it into the expression) and
 * does nothing when memory is empty; "clear" empties memory.
 */
export default function MemoryButtons({ result, onRecall }: MemoryButtonsProps) {
  const [memory, setMemory] = useState<number | null>(null);

  const store = () => {
    if (result !== null) {
      setMemory(result);
    }
  };

  const recall = () => {
    if (memory !== null) {
      onRecall(memory);
    }
  };

  const clear = () => {
    setMemory(null);
  };

  return (
    <div className={styles.memoryButtons} role="group" aria-label="Memory">
      <button
        type="button"
        className={styles.button}
        onClick={store}
        disabled={result === null}
        aria-label="Memory store"
      >
        MS
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={recall}
        disabled={memory === null}
        aria-label="Memory recall"
      >
        MR
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={clear}
        disabled={memory === null}
        aria-label="Memory clear"
      >
        MC
      </button>
    </div>
  );
}
