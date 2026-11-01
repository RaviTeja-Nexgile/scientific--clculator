import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("shows a display above a keypad of digit and operator buttons", () => {
    render(<App />);

    // Display is present and starts empty (shows "0").
    expect(screen.getByTestId("display")).toHaveTextContent("0");

    // Digit buttons 0-9 and the decimal point.
    for (const digit of ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]) {
      expect(screen.getByRole("button", { name: digit })).toBeInTheDocument();
    }

    // Operator buttons.
    for (const operator of ["+", "-", "×", "÷", "%", "√"]) {
      expect(screen.getByRole("button", { name: operator })).toBeInTheDocument();
    }
  });
});
