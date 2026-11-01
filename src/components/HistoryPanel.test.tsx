import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import HistoryPanel, {
  addHistoryEntry,
  HISTORY_LIMIT,
  type HistoryEntry,
} from "./HistoryPanel";

const entry = (expression: string, result: number): HistoryEntry => ({
  expression,
  result,
});

describe("HistoryPanel", () => {
  it("shows past calculations most recent first (5.2)", () => {
    const history = [
      entry("2 + 2", 4),
      entry("3 × 3", 9),
      entry("10 - 4", 6),
    ];
    render(
      <HistoryPanel history={history} onSelect={() => {}} onClear={() => {}} />,
    );

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);

    // The list is rendered in the order given (most recent first).
    const expressions = items.map((item) => item.textContent);
    expect(expressions[0]).toContain("2 + 2");
    expect(expressions[1]).toContain("3 × 3");
    expect(expressions[2]).toContain("10 - 4");
  });

  it("loads a past calculation's expression when clicked (5.3)", () => {
    const onSelect = vi.fn();
    const history = [entry("2 + 2", 4)];
    render(
      <HistoryPanel history={history} onSelect={onSelect} onClear={() => {}} />,
    );

    fireEvent.click(screen.getByRole("button", { name: /2 \+ 2/ }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(history[0]);
  });

  it("clears the history when the clear button is clicked (5.4)", () => {
    const onClear = vi.fn();
    const history = [entry("2 + 2", 4)];
    render(
      <HistoryPanel history={history} onSelect={() => {}} onClear={onClear} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("shows an empty message when there is no history", () => {
    render(
      <HistoryPanel history={[]} onSelect={() => {}} onClear={() => {}} />,
    );

    expect(screen.getByText("No calculations yet")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear" })).toBeDisabled();
  });
});

describe("addHistoryEntry", () => {
  it("adds a completed calculation to the front of the history (5.1)", () => {
    const history = [entry("3 × 3", 9)];
    const next = addHistoryEntry(history, entry("2 + 2", 4));

    expect(next).toHaveLength(2);
    expect(next[0]).toEqual(entry("2 + 2", 4));
    expect(next[1]).toEqual(entry("3 × 3", 9));
  });

  it("keeps only the 50 most recent calculations (5.5)", () => {
    // Start with 50 entries.
    let history: HistoryEntry[] = [];
    for (let i = 1; i <= 50; i += 1) {
      history = addHistoryEntry(history, entry(`expr ${i}`, i));
    }
    expect(history).toHaveLength(HISTORY_LIMIT);

    // Add a 51st: the oldest is dropped, the newest is first.
    const next = addHistoryEntry(history, entry("expr 51", 51));
    expect(next).toHaveLength(HISTORY_LIMIT);
    expect(next[0]).toEqual(entry("expr 51", 51));
    expect(next[HISTORY_LIMIT - 1]).toEqual(entry("expr 2", 2));
    expect(next.some((e) => e.expression === "expr 1")).toBe(false);
  });
});
