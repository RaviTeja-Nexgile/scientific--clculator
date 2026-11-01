import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import MemoryButtons from "./MemoryButtons";

describe("MemoryButtons", () => {
  it("stores the current result in memory and recalls it into the expression", () => {
    const onRecall = vi.fn();

    render(<MemoryButtons result={42} onRecall={onRecall} />);

    fireEvent.click(screen.getByRole("button", { name: "Memory store" }));
    fireEvent.click(screen.getByRole("button", { name: "Memory recall" }));

    expect(onRecall).toHaveBeenCalledTimes(1);
    expect(onRecall).toHaveBeenCalledWith(42);
  });

  it("does nothing when recalling with no stored value", () => {
    const onRecall = vi.fn();

    render(<MemoryButtons result={null} onRecall={onRecall} />);

    fireEvent.click(screen.getByRole("button", { name: "Memory recall" }));

    expect(onRecall).not.toHaveBeenCalled();
  });

  it("removes the stored value when cleared", () => {
    const onRecall = vi.fn();

    render(<MemoryButtons result={7} onRecall={onRecall} />);

    fireEvent.click(screen.getByRole("button", { name: "Memory store" }));
    fireEvent.click(screen.getByRole("button", { name: "Memory clear" }));
    fireEvent.click(screen.getByRole("button", { name: "Memory recall" }));

    expect(onRecall).not.toHaveBeenCalled();
  });

  it("does not store when there is no result", () => {
    const onRecall = vi.fn();

    render(<MemoryButtons result={null} onRecall={onRecall} />);

    const storeButton = screen.getByRole("button", { name: "Memory store" });
    expect(storeButton).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Memory recall" }));
    expect(onRecall).not.toHaveBeenCalled();
  });
});
