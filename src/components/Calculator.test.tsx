import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Calculator from "./Calculator";

/** Click a button by its accessible name. */
function click(name: string) {
  fireEvent.click(screen.getByRole("button", { name }));
}

/** Read the current display value. */
function displayValue() {
  return screen.getByTestId("display-value").textContent;
}

describe("Calculator", () => {
  it("shows a display above a keypad of digit, operator and control buttons (1.1)", () => {
    render(<Calculator />);

    // Display present and starts at "0".
    expect(screen.getByTestId("display")).toBeInTheDocument();
    expect(displayValue()).toBe("0");

    // Digit buttons 0-9 and the decimal point.
    for (const digit of ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]) {
      expect(screen.getByRole("button", { name: digit })).toBeInTheDocument();
    }

    // Operator buttons.
    for (const operator of ["+", "-", "×", "÷", "%", "√"]) {
      expect(screen.getByRole("button", { name: operator })).toBeInTheDocument();
    }

    // Control buttons.
    expect(screen.getByRole("button", { name: "=" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "C" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "⌫" })).toBeInTheDocument();
  });

  it("adds a digit or operator to the expression when clicked (1.2)", () => {
    render(<Calculator />);

    click("1");
    click("2");
    click("+");
    click("3");

    expect(displayValue()).toBe("12+3");
  });

  it("evaluates the expression and shows the result when equals is clicked (1.3)", () => {
    render(<Calculator />);

    click("2");
    click("+");
    click("3");
    click("=");

    expect(displayValue()).toBe("5");
  });

  it("removes the whole expression when clear is clicked (1.4)", () => {
    render(<Calculator />);

    click("1");
    click("2");
    click("+");
    click("3");
    expect(displayValue()).toBe("12+3");

    click("C");
    expect(displayValue()).toBe("0");
  });

  it("removes the last character when delete is clicked (1.5)", () => {
    render(<Calculator />);

    click("1");
    click("2");
    click("3");
    expect(displayValue()).toBe("123");

    click("⌫");
    expect(displayValue()).toBe("12");
  });

  it("adds a scientific function or constant when its button is clicked (1.7)", () => {
    render(<Calculator />);

    click("sin");
    expect(displayValue()).toBe("sin(");

    click("cos");
    expect(displayValue()).toBe("sin(cos(");

    click("π");
    expect(displayValue()).toBe("sin(cos(π");

    click("e");
    expect(displayValue()).toBe("sin(cos(πe");
  });

  it("evaluates a scientific expression (1.7)", () => {
    render(<Calculator />);

    // 5! = 120
    click("5");
    click("x!");
    click("=");
    expect(displayValue()).toBe("120");
  });

  it("shows an error message for an invalid expression (2.3)", () => {
    render(<Calculator />);

    click("5");
    click("÷");
    click("0");
    click("=");

    expect(displayValue()).toMatch(/zero/i);
  });

  describe("keyboard input (1.6)", () => {
    it("types digits and operators", () => {
      render(<Calculator />);

      fireEvent.keyDown(window, { key: "1" });
      fireEvent.keyDown(window, { key: "2" });
      fireEvent.keyDown(window, { key: "+" });
      fireEvent.keyDown(window, { key: "3" });

      expect(displayValue()).toBe("12+3");
    });

    it("maps * and / to × and ÷", () => {
      render(<Calculator />);

      fireEvent.keyDown(window, { key: "2" });
      fireEvent.keyDown(window, { key: "*" });
      fireEvent.keyDown(window, { key: "3" });

      expect(displayValue()).toBe("2×3");
    });

    it("evaluates on Enter", () => {
      render(<Calculator />);

      fireEvent.keyDown(window, { key: "2" });
      fireEvent.keyDown(window, { key: "+" });
      fireEvent.keyDown(window, { key: "3" });
      fireEvent.keyDown(window, { key: "Enter" });

      expect(displayValue()).toBe("5");
    });

    it("deletes the last character on Backspace", () => {
      render(<Calculator />);

      fireEvent.keyDown(window, { key: "1" });
      fireEvent.keyDown(window, { key: "2" });
      fireEvent.keyDown(window, { key: "Backspace" });

      expect(displayValue()).toBe("1");
    });

    it("clears on Escape", () => {
      render(<Calculator />);

      fireEvent.keyDown(window, { key: "1" });
      fireEvent.keyDown(window, { key: "2" });
      fireEvent.keyDown(window, { key: "Escape" });

      expect(displayValue()).toBe("0");
    });
  });
});
