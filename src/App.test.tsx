import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("Renders Hangman title", () => {
    // Arrange
    render(<App />);
    // Act -> imitate user behavior
    // expect -> We got what we expected
    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("Hangman");
  });
  it("Renders image with alt text", () => {
    // Arrange
    render(<App />);
    // Act -> imitate user behavior
    // expect -> We got what we expected
    expect(screen.getByRole("img")).toHaveAttribute("alt");
  });

  it("Renders buttons with type button", () => {
    // Arrange
    render(<App />);
    // Act -> imitate user behavior
    // expect -> We got what we expected
    expect(screen.getAllByRole("button")).toHaveLength(27);
  });
});
