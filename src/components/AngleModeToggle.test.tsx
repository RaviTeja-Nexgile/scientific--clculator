import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import AngleModeToggle from "./AngleModeToggle";

describe("AngleModeToggle", () => {
  it("starts in DEG mode and shows it in the display area", () => {
    render(<AngleModeToggle />);

    expect(screen.getByTestId("angle-mode-display")).toHaveTextContent("DEG");
  });

  it("switches between DEG and RAD when the toggle is clicked", () => {
    render(<AngleModeToggle />);

    const toggle = screen.getByRole("button", { name: "Toggle angle mode" });

    // DEG -> RAD
    fireEvent.click(toggle);
    expect(screen.getByTestId("angle-mode-display")).toHaveTextContent("RAD");

    // RAD -> DEG
    fireEvent.click(toggle);
    expect(screen.getByTestId("angle-mode-display")).toHaveTextContent("DEG");
  });

  it("reflects the current mode via aria-pressed", () => {
    render(<AngleModeToggle />);

    const toggle = screen.getByRole("button", { name: "Toggle angle mode" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("supports a controlled mode and reports changes through onModeChange", () => {
    const onModeChange = vi.fn();
    render(<AngleModeToggle mode="DEG" onModeChange={onModeChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle angle mode" }));

    expect(onModeChange).toHaveBeenCalledWith("RAD");
  });
});
