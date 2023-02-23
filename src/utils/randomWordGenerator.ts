import ENGLISH_WORDS from "../data/words";

// Random word generator
export function randomWord() {
  return ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
}
