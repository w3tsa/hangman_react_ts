import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Hangman from "./Hangman";

describe("Hangman", () => {
  it("Renders Hangman title", () => {
    // Arrange
    render(<Hangman />);
    // Act -> imitate user behavior
    // expect -> We got what we expected
    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("Hangman");
  });
  it("Changes the image while pressing the button", async () => {
    // Arrange
    // const handleClick = vi.fn();
    const resetButton = screen.getByLabelText("restart-test");
    render(<Hangman />);
    // Act -> imitate user behavior
    fireEvent.click(resetButton);
    // expect -> We got what we expected
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "0 out of 6 guesses"
    );
  });
});
