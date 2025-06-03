export type GameState = 'start' | 'playing' | 'gameOver';

export interface Trigram {
  symbol: string;
  name: string;
  meaning: string;
  element: string;
}

export interface Option {
  name: string;
  meaning: string;
  isCorrect: boolean;
}