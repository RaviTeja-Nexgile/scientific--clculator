/**
 * Expression evaluator for the Scientific Calculator.
 *
 * A pure, dependency-free recursive-descent parser and evaluator. It parses an
 * expression string into a number, or returns a typed `EvalError` describing
 * what went wrong. It owns the calculation rules: operator precedence, angle
 * mode (DEG/RAD), factorial, square root, division by zero, and invalid
 * expressions such as mismatched parentheses.
 */

export type AngleMode = "DEG" | "RAD";

export type EvalErrorKind =
  | "division-by-zero"
  | "sqrt-of-negative"
  | "factorial-of-negative"
  | "factorial-of-non-integer"
  | "invalid-expression";

export interface EvalError {
  readonly ok: false;
  readonly kind: EvalErrorKind;
  readonly message: string;
}

export type EvalResult = number | EvalError;

/** The mathematical constant π. */
const PI = Math.PI;
/** The mathematical constant e. */
const E = Math.E;

/** A token produced by the lexer. */
type Token =
  | { type: "number"; value: number }
  | { type: "operator"; value: "+" | "-" | "×" | "÷" | "%" | "^" }
  | { type: "lparen" }
  | { type: "rparen" }
  | { type: "function"; value: "sin" | "cos" | "tan" | "log" | "ln" | "sqrt" }
  | { type: "factorial" }
  | { type: "constant"; value: "pi" | "e" };

/**
 * Tokenize the expression string. Throws an `EvalError` on any character that
 * cannot be part of a valid expression.
 */
function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  const isDigit = (c: string) => c >= "0" && c <= "9";

  while (i < input.length) {
    const c = input[i];

    // Whitespace is ignored.
    if (c === " " || c === "\t" || c === "\n" || c === "\r") {
      i += 1;
      continue;
    }

    // Numbers: integer and decimal, with optional leading sign handled by the
    // parser (unary minus/plus), not here.
    if (isDigit(c) || (c === "." && isDigit(input[i + 1] ?? ""))) {
      let j = i;
      let seenDot = false;
      while (j < input.length) {
        const d = input[j];
        if (isDigit(d)) {
          j += 1;
        } else if (d === "." && !seenDot) {
          seenDot = true;
          j += 1;
        } else {
          break;
        }
      }
      const text = input.slice(i, j);
      const value = Number(text);
      if (Number.isNaN(value)) {
        throw err("invalid-expression", `Invalid number "${text}"`);
      }
      tokens.push({ type: "number", value });
      i = j;
      continue;
    }

    // Multi-character operators and function/constant names.
    if (c === "×") {
      tokens.push({ type: "operator", value: "×" });
      i += 1;
      continue;
    }
    if (c === "÷") {
      tokens.push({ type: "operator", value: "÷" });
      i += 1;
      continue;
    }
    if (c === "+") {
      tokens.push({ type: "operator", value: "+" });
      i += 1;
      continue;
    }
    if (c === "-") {
      tokens.push({ type: "operator", value: "-" });
      i += 1;
      continue;
    }
    if (c === "%") {
      tokens.push({ type: "operator", value: "%" });
      i += 1;
      continue;
    }
    if (c === "^") {
      tokens.push({ type: "operator", value: "^" });
      i += 1;
      continue;
    }
    if (c === "(") {
      tokens.push({ type: "lparen" });
      i += 1;
      continue;
    }
    if (c === ")") {
      tokens.push({ type: "rparen" });
      i += 1;
      continue;
    }
    if (c === "!") {
      tokens.push({ type: "factorial" });
      i += 1;
      continue;
    }

    // Square root may be written as "√" or "sqrt".
    if (c === "√") {
      tokens.push({ type: "function", value: "sqrt" });
      i += 1;
      continue;
    }

    // The π constant may be written as the Greek letter.
    if (c === "π") {
      tokens.push({ type: "constant", value: "pi" });
      i += 1;
      continue;
    }

    // Identifiers: function names and constants.
    if (/[a-zA-Z]/.test(c)) {
      let j = i;
      while (j < input.length && /[a-zA-Z]/.test(input[j])) {
        j += 1;
      }
      const word = input.slice(i, j).toLowerCase();
      if (word === "sin" || word === "cos" || word === "tan" || word === "log" || word === "ln" || word === "sqrt") {
        tokens.push({ type: "function", value: word });
      } else if (word === "pi" || word === "π") {
        tokens.push({ type: "constant", value: "pi" });
      } else if (word === "e") {
        tokens.push({ type: "constant", value: "e" });
      } else {
        throw err("invalid-expression", `Unknown symbol "${word}"`);
      }
      i = j;
      continue;
    }

    throw err("invalid-expression", `Unexpected character "${c}"`);
  }

  return tokens;
}

/** Build an `EvalError` value. */
function err(kind: EvalErrorKind, message: string): EvalError {
  return { ok: false, kind, message };
}

/**
 * Recursive-descent parser/evaluator. It consumes the token stream and returns
 * the numeric value of the expression, or throws an `EvalError`.
 */
class Parser {
  private pos = 0;

  constructor(
    private readonly tokens: Token[],
    private readonly mode: AngleMode,
  ) {}

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private next(): Token | undefined {
    return this.tokens[this.pos++];
  }

  /** entry point: parse the whole expression. */
  parse(): number {
    if (this.tokens.length === 0) {
      throw err("invalid-expression", "Empty expression");
    }
    const value = this.parseExpression();
    if (this.pos < this.tokens.length) {
      throw err("invalid-expression", "Unexpected token after expression");
    }
    return value;
  }

  /** addition / subtraction (lowest precedence). */
  private parseExpression(): number {
    let left = this.parseTerm();
    for (;;) {
      const t = this.peek();
      if (t && t.type === "operator" && (t.value === "+" || t.value === "-")) {
        this.next();
        const right = this.parseTerm();
        left = t.value === "+" ? left + right : left - right;
      } else {
        return left;
      }
    }
  }

  /** multiplication / division / modulo. */
  private parseTerm(): number {
    let left = this.parseUnary();
    for (;;) {
      const t = this.peek();
      if (t && t.type === "operator" && (t.value === "×" || t.value === "÷" || t.value === "%")) {
        this.next();
        const right = this.parseUnary();
        if (t.value === "×") {
          left = left * right;
        } else if (t.value === "÷") {
          if (right === 0) {
            throw err("division-by-zero", "Cannot divide by zero");
          }
          left = left / right;
        } else {
          // modulo
          if (right === 0) {
            throw err("division-by-zero", "Cannot divide by zero");
          }
          left = left % right;
        }
      } else {
        return left;
      }
    }
  }

  /** unary minus/plus, power, factorial, and primary values. */
  private parseUnary(): number {
    const t = this.peek();
    if (t && t.type === "operator" && (t.value === "+" || t.value === "-")) {
      this.next();
      const operand = this.parseUnary();
      return t.value === "-" ? -operand : operand;
    }
    return this.parsePower();
  }

  /** exponentiation (right-associative), then factorial. */
  private parsePower(): number {
    const base = this.parsePostfix();
    const t = this.peek();
    if (t && t.type === "operator" && t.value === "^") {
      this.next();
      const exponent = this.parseUnary(); // right-associative
      return Math.pow(base, exponent);
    }
    return base;
  }

  /** factorial postfix operator. */
  private parsePostfix(): number {
    const value = this.parsePrimary();
    const t = this.peek();
    if (t && t.type === "factorial") {
      this.next();
      return factorial(value);
    }
    return value;
  }

  /** numbers, constants, parenthesised expressions, and function calls. */
  private parsePrimary(): number {
    const t = this.next();
    if (!t) {
      throw err("invalid-expression", "Unexpected end of expression");
    }

    switch (t.type) {
      case "number":
        return t.value;
      case "constant":
        return t.value === "pi" ? PI : E;
      case "lparen": {
        const value = this.parseExpression();
        const close = this.next();
        if (!close || close.type !== "rparen") {
          throw err("invalid-expression", "Mismatched parentheses");
        }
        return value;
      }
      case "function": {
        const arg = this.parseFunctionArgument();
        return applyFunction(t.value, arg, this.mode);
      }
      default:
        throw err("invalid-expression", "Unexpected token");
    }
  }

  /** parse the argument of a function call: `sin(30)` or `√16`. */
  private parseFunctionArgument(): number {
    const t = this.peek();
    if (t && t.type === "lparen") {
      this.next();
      const value = this.parseExpression();
      const close = this.next();
      if (!close || close.type !== "rparen") {
        throw err("invalid-expression", "Mismatched parentheses");
      }
      return value;
    }
    // Allow a bare argument (e.g. `√16` or `sin 30`).
    return this.parseUnary();
  }
}

/** Apply a scientific function to an argument, honouring the angle mode. */
function applyFunction(name: "sin" | "cos" | "tan" | "log" | "ln" | "sqrt", arg: number, mode: AngleMode): number {
  switch (name) {
    case "sin": {
      const radians = mode === "DEG" ? (arg * PI) / 180 : arg;
      return Math.sin(radians);
    }
    case "cos": {
      const radians = mode === "DEG" ? (arg * PI) / 180 : arg;
      return Math.cos(radians);
    }
    case "tan": {
      const radians = mode === "DEG" ? (arg * PI) / 180 : arg;
      return Math.tan(radians);
    }
    case "log":
      if (arg <= 0) {
        throw err("invalid-expression", "log is undefined for non-positive values");
      }
      return Math.log10(arg);
    case "ln":
      if (arg <= 0) {
        throw err("invalid-expression", "ln is undefined for non-positive values");
      }
      return Math.log(arg);
    case "sqrt":
      if (arg < 0) {
        throw err("sqrt-of-negative", "Cannot take the square root of a negative number");
      }
      return Math.sqrt(arg);
  }
}

/** Compute the factorial of a non-negative integer. */
function factorial(n: number): number {
  if (!Number.isInteger(n)) {
    throw err("factorial-of-non-integer", "Factorial is only defined for integers");
  }
  if (n < 0) {
    throw err("factorial-of-negative", "Factorial is not defined for negative numbers");
  }
  let result = 1;
  for (let k = 2; k <= n; k += 1) {
    result *= k;
  }
  return result;
}

/**
 * Evaluate an expression string into a number, or return a typed `EvalError`.
 *
 * @param expression the expression to evaluate, e.g. `sin(30)` or `5 ÷ 0`.
 * @param mode the angle mode for trigonometric functions: `"DEG"` or `"RAD"`.
 */
export function evaluate(expression: string, mode: AngleMode): EvalResult {
  try {
    const tokens = tokenize(expression);
    const parser = new Parser(tokens, mode);
    const value = parser.parse();
    if (!Number.isFinite(value)) {
      return err("invalid-expression", "Result is not a finite number");
    }
    return value;
  } catch (e) {
    if (isEvalError(e)) {
      return e;
    }
    // Defensive: any unexpected error is reported as an invalid expression.
    return err("invalid-expression", "Invalid expression");
  }
}

/** Type guard for `EvalError`. */
function isEvalError(value: unknown): value is EvalError {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as EvalError).ok === false &&
    typeof (value as EvalError).kind === "string" &&
    typeof (value as EvalError).message === "string"
  );
}
