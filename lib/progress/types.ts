import type { AlternativeKey } from "@/lib/questions/types";

export type SavedAnswer = {
  questionId: string;
  selectedAnswer: AlternativeKey;
  isCorrect: boolean;
  answeredAt: string;
};

export type SoldadoProgress = {
  version: 1;
  answers: Record<string, SavedAnswer>;
  favorites: Record<string, boolean>;
  lastQuestionId?: string;
  updatedAt: string;
};

export type ProgressStats = {
  totalAnswered: number;
  totalCorrect: number;
  totalWrong: number;
  accuracyPercentage: number;
  favoriteCount: number;
  wrongQuestionIds: string[];
  favoriteQuestionIds: string[];
};

export type SubjectProgress = {
  subject: string;
  total: number;
  answered: number;
  correct: number;
  wrong: number;
  accuracyPercentage: number;
};
