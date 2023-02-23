import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Hangman from "./Hangman";

describe("Hangman", () => {
  it("all buttons are clicked", () => {
    render(<Hangman />);
    const buttons = screen.getAllByTestId(/^[a-z]$/); // select all buttons
    const result = screen.getByTestId("hangman_image");
    buttons.forEach((btn) => fireEvent.click(btn)); // simulate click on each button
    expect(buttons).toHaveLength(26); // expect all 26 buttons to be clicked
    expect(result).toMatchInlineSnapshot(`
      <img
        alt="6 out of 6 guesses"
        class="hangman_main_image"
        data-testid="hangman_image"
        src="/src/assets/6.png"
      />
    `);
  });

  it("restart the game", () => {
    const { getByText, getByTestId } = render(<Hangman />);
    // make some guesses to change the state
    fireEvent.click(getByText("a"));
    fireEvent.click(getByText("e"));
    fireEvent.click(getByText("i"));

    // verify that the state has change
    expect(getByTestId("hangman_image")).toHaveAttribute("alt");
    expect(getByText(/Guessed wrong:/)).toBeInTheDocument();

    // restart the game
    fireEvent.click(getByText("Restart"));

    // verify that the state has been reset to the default state
    expect(getByTestId("hangman_image")).toHaveAttribute(
      "alt",
      "0 out of 6 guesses"
    );
    expect(getByText("Guessed wrong: 0")).toBeInTheDocument();
  });

  it("renders 'You Lose!' when the game is over", async () => {
    const user = userEvent.setup();
    render(<Hangman />);
    const buttons = screen.getAllByRole("button");
    // make all wrong guesses
    for (let btn of buttons) {
      return await user.click(btn);
    }
    const result = screen.getByTestId("hangman_image");
    expect(result).toHaveAttribute("alt", "6 out of 6 guesses");
    const gameState = screen.getByText("You Lose!");
    expect(gameState).toBeInTheDocument();
  });

  it("renders 'You Win!' when the game is over", async () => {
    const user = userEvent.setup();
    // force the answer to be the first word in the list
    vi.spyOn(global.Math, "random").mockReturnValueOnce(0);
    render(<Hangman />);
    const buttons = screen.getAllByRole("button");
    const word = "apple";
    const letters = word.split("");
    // make all correct guesses
    for (let ltr of letters) {
      const button = buttons.find((btn) => btn.textContent === ltr);
      if (button) return await user.click(button);
    }
    const result = screen.getByTestId("hangman_image");
    // make sure the image is the first one
    expect(result).toHaveAttribute("alt", "0 out of 6 guesses");
    const gameState = screen.getByText("You Win!");
    expect(gameState).toBeInTheDocument();
  });
});
