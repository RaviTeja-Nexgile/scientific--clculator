import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("shows the calculator in one theme (dark) when it opens", () => {
    render(<ThemeToggle />);

    const toggle = screen.getByTestId("theme-toggle");
    expect(toggle).toBeInTheDocument();
    // Defaults to the dark theme.
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("switches between the dark and light theme when clicked", () => {
    render(<ThemeToggle />);

    const toggle = screen.getByTestId("theme-toggle");

    // Dark -> light.
    fireEvent.click(toggle);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(toggle).toHaveAttribute("aria-pressed", "true");

    // Light -> dark.
    fireEvent.click(toggle);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });
});
