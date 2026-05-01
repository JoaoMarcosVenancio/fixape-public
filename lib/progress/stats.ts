import type { SoldadoQuestion } from "@/lib/questions/types";
import type { ProgressStats, SoldadoProgress, SubjectProgress } from "./types";

export function calculateProgressStats(progress: SoldadoProgress): ProgressStats {
  const answers = Object.values(progress.answers);
  const totalAnswered = answers.length;
  const totalCorrect = answers.filter((answer) => answer.isCorrect).length;
  const totalWrong = totalAnswered - totalCorrect;
  const favoriteQuestionIds = Object.entries(progress.favorites)
    .filter(([, isFavorite]) => isFavorite)
    .map(([questionId]) => questionId);

  return {
    totalAnswered,
    totalCorrect,
    totalWrong,
    accuracyPercentage: totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100),
    favoriteCount: favoriteQuestionIds.length,
    wrongQuestionIds: answers.filter((answer) => !answer.isCorrect).map((answer) => answer.questionId),
    favoriteQuestionIds,
  };
}

export function calculateProgressBySubject(questions: SoldadoQuestion[], progress: SoldadoProgress): SubjectProgress[] {
  const bySubject = new Map<string, SubjectProgress>();

  for (const question of questions) {
    const current =
      bySubject.get(question.materia) ??
      ({
        subject: question.materia,
        total: 0,
        answered: 0,
        correct: 0,
        wrong: 0,
        accuracyPercentage: 0,
      } satisfies SubjectProgress);

    const answer = progress.answers[question.id];
    current.total += 1;
    if (answer) {
      current.answered += 1;
      if (answer.isCorrect) current.correct += 1;
      else current.wrong += 1;
    }

    bySubject.set(question.materia, current);
  }

  return Array.from(bySubject.values())
    .map((subject) => ({
      ...subject,
      accuracyPercentage: subject.answered === 0 ? 0 : Math.round((subject.correct / subject.answered) * 100),
    }))
    .sort((a, b) => a.subject.localeCompare(b.subject, "pt-BR", { sensitivity: "base" }));
}
