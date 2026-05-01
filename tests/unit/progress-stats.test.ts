import { describe, expect, it } from "vitest";
import type { SoldadoQuestion } from "@/lib/questions/types";
import { calculateProgressBySubject, calculateProgressStats } from "@/lib/progress/stats";
import type { SoldadoProgress } from "@/lib/progress/types";

function question(id: string, materia: string): SoldadoQuestion {
  return {
    id,
    idOriginal: id,
    cargo: "soldado",
    materia,
    topico: "Topico",
    banca: "AOCP",
    instituicao: "PM PE",
    concurso: "PMPE Soldado",
    ano: "2024",
    numero: 1,
    enunciado: "Enunciado",
    alternativas: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    gabarito: "A",
    comentario: "",
  };
}

const progress: SoldadoProgress = {
  version: 1,
  answers: {
    q1: { questionId: "q1", selectedAnswer: "A", isCorrect: true, answeredAt: "2026-01-01T00:00:00.000Z" },
    q2: { questionId: "q2", selectedAnswer: "B", isCorrect: false, answeredAt: "2026-01-01T00:00:00.000Z" },
  },
  favorites: {
    q2: true,
    q3: true,
  },
  lastQuestionId: "q2",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("lib/progress/stats", () => {
  it("calcula totais, aproveitamento, erros e favoritas", () => {
    const stats = calculateProgressStats(progress);

    expect(stats.totalAnswered).toBe(2);
    expect(stats.totalCorrect).toBe(1);
    expect(stats.totalWrong).toBe(1);
    expect(stats.accuracyPercentage).toBe(50);
    expect(stats.favoriteCount).toBe(2);
    expect(stats.wrongQuestionIds).toEqual(["q2"]);
    expect(stats.favoriteQuestionIds.sort()).toEqual(["q2", "q3"]);
  });

  it("calcula progresso por materia", () => {
    const result = calculateProgressBySubject(
      [question("q1", "Portugues"), question("q2", "Portugues"), question("q3", "Matematica")],
      progress
    );

    const portugues = result.find((item) => item.subject === "Portugues");
    const matematica = result.find((item) => item.subject === "Matematica");

    expect(portugues).toMatchObject({
      total: 2,
      answered: 2,
      correct: 1,
      wrong: 1,
      accuracyPercentage: 50,
    });
    expect(matematica).toMatchObject({
      total: 1,
      answered: 0,
      correct: 0,
      wrong: 0,
      accuracyPercentage: 0,
    });
  });
});
