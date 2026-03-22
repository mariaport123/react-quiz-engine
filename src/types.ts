// Core types for the quiz logic
export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  questionText: string;
  options: Option[];
  correctAnswerId: string;
}

export interface UserResult {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
}