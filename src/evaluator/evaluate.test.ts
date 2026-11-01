import { describe, expect, it } from "vitest";
import { evaluate, type EvalError } from "./evaluate";

/** Assert that `evaluate` returns a number close to `expected`. */
function expectValue(expression: string, mode: "DEG" | "RAD", expected: number) {
  const result = evaluate(expression, mode);
  expect(result).not.toHaveProperty("ok");
  expect(typeof result).toBe("number");
  expect(result as number).toBeCloseTo(expected, 3);
}

/** Assert that `evaluate` returns an `EvalError` of the given kind. */
function expectError(expression: string, mode: "DEG" | "RAD", kind: EvalError["kind"]) {
  const result = evaluate(expression, mode);
  expect(result).toHaveProperty("ok", false);
  const error = result as EvalError;
  expect(error.kind).toBe(kind);
  expect(error.message).toBeTruthy();
}

describe("evaluate", () => {
  describe("trigonometry and angle mode", () => {
    it("evaluates sin(30) in DEG mode as 0.5 (2.1)", () => {
      expectValue("sin(30)", "DEG", 0.5);
    });

    it("evaluates sin(30) in RAD mode as -0.988 (2.2)", () => {
      expectValue("sin(30)", "RAD", -0.988);
    });
  });

  describe("division", () => {
    it("shows an error for 5 ÷ 0 (2.3)", () => {
      expectError("5 ÷ 0", "DEG", "division-by-zero");
    });

    it("evaluates 0 ÷ 5 as 0 (2.4)", () => {
      expectValue("0 ÷ 5", "DEG", 0);
    });
  });

  describe("factorial", () => {
    it("evaluates 5! as 120 (2.5)", () => {
      expectValue("5!", "DEG", 120);
    });

    it("shows an error for (-3)! (2.6)", () => {
      expectError("(-3)!", "DEG", "factorial-of-negative");
    });
  });

  describe("square root", () => {
    it("shows an error for √(-4) (2.7)", () => {
      expectError("√(-4)", "DEG", "sqrt-of-negative");
    });

    it("evaluates √(16) as 4 (2.8)", () => {
      expectValue("√(16)", "DEG", 4);
    });
  });

  describe("invalid expressions", () => {
    it("shows an error for mismatched parentheses (2.9)", () => {
      expectError("(5 + 3", "DEG", "invalid-expression");
      expectError("5 + 3)", "DEG", "invalid-expression");
    });

    it("shows an error for an empty expression", () => {
      expectError("", "DEG", "invalid-expression");
    });

    it("shows an error for a trailing operator", () => {
      expectError("5 +", "DEG", "invalid-expression");
    });
  });

  describe("additional calculation rules", () => {
    it("evaluates basic arithmetic with precedence", () => {
      expectValue("2 + 3 × 4", "DEG", 14);
      expectValue("(2 + 3) × 4", "DEG", 20);
      expectValue("10 - 2 - 3", "DEG", 5);
    });

    it("evaluates exponentiation", () => {
      expectValue("2^3", "DEG", 8);
      expectValue("2^3^2", "DEG", 512);
    });

    it("evaluates percentage as modulo", () => {
      expectValue("7 % 3", "DEG", 1);
    });

    it("evaluates constants", () => {
      expectValue("π", "DEG", Math.PI);
      expectValue("e", "DEG", Math.E);
    });

    it("evaluates other scientific functions", () => {
      expectValue("cos(0)", "DEG", 1);
      expectValue("ln(e)", "DEG", 1);
      expectValue("log(100)", "DEG", 2);
    });
  });
});
