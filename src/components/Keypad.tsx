import styles from "./Calculator.module.css";

export type KeyKind = "digit" | "operator" | "function" | "constant" | "control";

export interface KeyDef {
  /** The text shown on the button (also its accessible name). */
  label: string;
  /** The value appended to the expression when the button is clicked. */
  insert: string;
  /** The visual/behavioural category of the button. */
  kind: KeyKind;
}

const DIGITS: KeyDef[] = [
  { label: "7", insert: "7", kind: "digit" },
  { label: "8", insert: "8", kind: "digit" },
  { label: "9", insert: "9", kind: "digit" },
  { label: "4", insert: "4", kind: "digit" },
  { label: "5", insert: "5", kind: "digit" },
  { label: "6", insert: "6", kind: "digit" },
  { label: "1", insert: "1", kind: "digit" },
  { label: "2", insert: "2", kind: "digit" },
  { label: "3", insert: "3", kind: "digit" },
  { label: "0", insert: "0", kind: "digit" },
  { label: ".", insert: ".", kind: "digit" },
];

const OPERATORS: KeyDef[] = [
  { label: "+", insert: "+", kind: "operator" },
  { label: "-", insert: "-", kind: "operator" },
  { label: "×", insert: "×", kind: "operator" },
  { label: "÷", insert: "÷", kind: "operator" },
  { label: "%", insert: "%", kind: "operator" },
  { label: "√", insert: "√(", kind: "operator" },
  { label: "(", insert: "(", kind: "operator" },
  { label: ")", insert: ")", kind: "operator" },
];

const FUNCTIONS: KeyDef[] = [
  { label: "sin", insert: "sin(", kind: "function" },
  { label: "cos", insert: "cos(", kind: "function" },
  { label: "tan", insert: "tan(", kind: "function" },
  { label: "log", insert: "log(", kind: "function" },
  { label: "ln", insert: "ln(", kind: "function" },
  { label: "xʸ", insert: "^", kind: "function" },
  { label: "x!", insert: "!", kind: "function" },
  { label: "π", insert: "π", kind: "constant" },
  { label: "e", insert: "e", kind: "constant" },
];

export interface KeypadProps {
  /** Called with the value to append when a digit/operator/function key is pressed. */
  onAppend: (value: string) => void;
  /** Called when the equals button is pressed. */
  onEquals: () => void;
  /** Called when the clear button is pressed. */
  onClear: () => void;
  /** Called when the delete button is pressed. */
  onDelete: () => void;
}

/**
 * The grid of digit, operator, scientific-function and control buttons.
 */
export default function Keypad({ onAppend, onEquals, onClear, onDelete }: KeypadProps) {
  return (
    <div className={styles.keypad}>
      <div className={styles.functions}>
        {FUNCTIONS.map((key) => (
          <button
            key={key.label}
            type="button"
            className={`${styles.key} ${styles.keyFunction}`}
            onClick={() => onAppend(key.insert)}
          >
            {key.label}
          </button>
        ))}
      </div>
      <div className={styles.digits}>
        {DIGITS.map((key) => (
          <button
            key={key.label}
            type="button"
            className={`${styles.key} ${styles.keyDigit}`}
            onClick={() => onAppend(key.insert)}
          >
            {key.label}
          </button>
        ))}
      </div>
      <div className={styles.operators}>
        {OPERATORS.map((key) => (
          <button
            key={key.label}
            type="button"
            className={`${styles.key} ${styles.keyOperator}`}
            onClick={() => onAppend(key.insert)}
          >
            {key.label}
          </button>
        ))}
      </div>
      <div className={styles.controls}>
        <button type="button" className={`${styles.key} ${styles.keyClear}`} onClick={onClear}>
          C
        </button>
        <button type="button" className={`${styles.key} ${styles.keyDelete}`} onClick={onDelete}>
          ⌫
        </button>
        <button type="button" className={`${styles.key} ${styles.keyEquals}`} onClick={onEquals}>
          =
        </button>
      </div>
    </div>
  );
}
