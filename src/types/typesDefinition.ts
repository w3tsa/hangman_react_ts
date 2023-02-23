type DefaultProps = {
  maxWrong: number;
  images: string[];
};

type DefaultState = {
  nWrong: number;
  guessed: Set<string>;
  answer: string;
};

export type { DefaultProps, DefaultState };
