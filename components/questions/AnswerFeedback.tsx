"use client";

import type { AlternativeKey, SoldadoQuestion } from "@/lib/questions/types";

export function AnswerFeedback({
  question,
  selectedAnswer,
}: {
  question: SoldadoQuestion;
  selectedAnswer: AlternativeKey;
}) {
  const isCorrect = selectedAnswer === question.gabarito;
  const comentario = question.comentario.trim() || "Comentário indisponível no momento.";

  return (
    <section
      aria-live="polite"
      style={{
        border: `1.5px solid ${isCorrect ? "rgba(22,163,74,0.35)" : "rgba(220,38,38,0.32)"}`,
        background: isCorrect ? "rgba(22,163,74,0.07)" : "rgba(220,38,38,0.06)",
        borderRadius: 14,
        padding: "18px 18px",
        marginTop: 20,
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: isCorrect ? "#15803d" : "#b91c1c",
          marginBottom: 8,
        }}
      >
        {isCorrect ? "Resposta correta" : "Resposta errada"}
      </div>
      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65, margin: "0 0 10px" }}>
        Gabarito: <strong>{question.gabarito}</strong>
      </p>
      <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{comentario}</p>
    </section>
  );
}
