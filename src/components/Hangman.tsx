import { MouseEvent, useState } from "react";
import Confetti from "react-confetti";

import "./Hangman.css";

// import local images & audios
import img0 from "../assets/0.png";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";

import win from "../assets/winner.mp3";
import lose from "../assets/lose.mp3";

// utils
import { randomWord } from "../utils/randomWordGenerator";
// types
import { DefaultProps, DefaultState } from "../types/typesDefinition";

const Hangman = () => {
  const defaultProps: DefaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };
  const defaultState: DefaultState = {
    nWrong: 0,
    guessed: new Set(),
    answer: randomWord(),
  };
  const [state, setState] = useState(defaultState);
  const gameOver = state.nWrong >= defaultProps.maxWrong;
  const isWinner = !guessedWord().includes("_");
  let gameState: JSX.Element[] | string = generateButtons();

  if (gameOver) gameState = "You Lose!";
  if (isWinner) gameState = "You Win!";

  /*   guessedWord: show current-state of word:
    if passed letters are {a, p , e}, show "app_e" for "apple"
 */
  function guessedWord() {
    return state.answer
      .split("")
      .map((ltr) => (state.guessed.has(ltr) ? ltr : "_"));
  }
  // generateButtons: return array of letter buttons to render
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        value={ltr}
        key={ltr}
        onClick={handleGuess}
        disabled={state.guessed.has(ltr)}
        type="button"
        data-testid={ltr}
      >
        {ltr}
      </button>
    ));
  }

  function handleGuess(e: MouseEvent) {
    let ltr = (e.target as HTMLButtonElement).value;
    setState({
      ...state,
      guessed: state.guessed.add(ltr),
      nWrong: state.nWrong + (state.answer.includes(ltr) ? 0 : 1),
    });
  }

  function restart() {
    setState(defaultState);
  }

  // render
  return (
    <div className="Hangman">
      {isWinner && (
        <>
          <audio autoPlay>
            <source src={win} type="audio/mp3" />
          </audio>
          <Confetti />
        </>
      )}
      {gameOver && (
        <audio autoPlay>
          <source src={lose} type="audio/mp3" />
        </audio>
      )}
      <h1>Hangman</h1>
      <img
        src={defaultProps.images[state.nWrong]}
        alt={`${state.nWrong} out of ${defaultProps.maxWrong} guesses`}
        className="hangman_main_image"
        data-testid="hangman_image"
      />
      <p className="Hangman-wrong">Guessed wrong: {state.nWrong}</p>
      <p className="Hangman-word">{!gameOver ? guessedWord() : state.answer}</p>
      <p className="Hangman-btns">{gameState}</p>
      <br />
      <button type="button" className="restartBtn" onClick={restart}>
        Restart
      </button>
    </div>
  );
};

export default Hangman;
