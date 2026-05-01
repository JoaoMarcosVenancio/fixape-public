import type { AlternativeKey } from "@/lib/questions/types";
import type { SavedAnswer, SoldadoProgress } from "./types";

export const SOLDADO_PROGRESS_STORAGE_KEY = "fixape:soldado:progress:v1";

function nowIso() {
  return new Date().toISOString();
}

function canUseLocalStorage() {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
}

function isValidAnswer(value: unknown): value is AlternativeKey {
  return value === "A" || value === "B" || value === "C" || value === "D" || value === "E";
}

function isProgress(value: unknown): value is SoldadoProgress {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SoldadoProgress>;
  return candidate.version === 1 && typeof candidate.answers === "object" && typeof candidate.favorites === "object";
}

export function getInitialProgress(): SoldadoProgress {
  return {
    version: 1,
    answers: {},
    favorites: {},
    updatedAt: nowIso(),
  };
}

export function loadProgress(): SoldadoProgress {
  if (!canUseLocalStorage()) return getInitialProgress();

  try {
    const raw = window.localStorage.getItem(SOLDADO_PROGRESS_STORAGE_KEY);
    if (!raw) return getInitialProgress();
    const parsed = JSON.parse(raw);
    if (!isProgress(parsed)) return getInitialProgress();

    return {
      version: 1,
      answers: parsed.answers ?? {},
      favorites: parsed.favorites ?? {},
      lastQuestionId: parsed.lastQuestionId,
      updatedAt: parsed.updatedAt || nowIso(),
    };
  } catch {
    return getInitialProgress();
  }
}

export function saveProgress(progress: SoldadoProgress): SoldadoProgress {
  const nextProgress = { ...progress, updatedAt: nowIso() };
  if (!canUseLocalStorage()) return nextProgress;
  try {
    window.localStorage.setItem(SOLDADO_PROGRESS_STORAGE_KEY, JSON.stringify(nextProgress));
  } catch {
    return nextProgress;
  }
  return nextProgress;
}

export function clearProgress(): SoldadoProgress {
  const nextProgress = getInitialProgress();
  if (canUseLocalStorage()) {
    try {
      window.localStorage.removeItem(SOLDADO_PROGRESS_STORAGE_KEY);
    } catch {
      return nextProgress;
    }
  }
  return nextProgress;
}

export function saveAnswer(questionId: string, selectedAnswer: AlternativeKey, correctAnswer: AlternativeKey): SoldadoProgress {
  const progress = loadProgress();
  const answer: SavedAnswer = {
    questionId,
    selectedAnswer,
    isCorrect: selectedAnswer === correctAnswer,
    answeredAt: nowIso(),
  };

  return saveProgress({
    ...progress,
    answers: {
      ...progress.answers,
      [questionId]: answer,
    },
    lastQuestionId: questionId,
  });
}

export function toggleFavorite(questionId: string): SoldadoProgress {
  const progress = loadProgress();
  const nextValue = !progress.favorites[questionId];
  const favorites = { ...progress.favorites };

  if (nextValue) {
    favorites[questionId] = true;
  } else {
    delete favorites[questionId];
  }

  return saveProgress({
    ...progress,
    favorites,
    lastQuestionId: questionId,
  });
}

export function isFavorite(questionId: string): boolean {
  return Boolean(loadProgress().favorites[questionId]);
}

export function getSavedAnswer(questionId: string): SavedAnswer | undefined {
  const answer = loadProgress().answers[questionId];
  if (!answer || !isValidAnswer(answer.selectedAnswer)) return undefined;
  return answer;
}

export function setLastQuestion(questionId: string): SoldadoProgress {
  return saveProgress({
    ...loadProgress(),
    lastQuestionId: questionId,
  });
}

export function getLastQuestionId(): string | undefined {
  return loadProgress().lastQuestionId;
}
