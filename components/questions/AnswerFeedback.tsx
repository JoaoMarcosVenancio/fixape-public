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
  const comentario = question.comentario?.trim();

  return (
    <section
      aria-live="polite"
      className="answer-feedback"
      style={{
        border: `1px solid ${isCorrect ? "rgba(22,163,74,0.30)" : "rgba(220,38,38,0.26)"}`,
        background: isCorrect ? "rgba(22,163,74,0.055)" : "rgba(220,38,38,0.05)",
        borderRadius: 12,
        padding: 12,
        marginTop: 14,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: isCorrect ? "#166534" : "#991b1b",
          marginBottom: 4,
        }}
      >
        {isCorrect ? "Resposta correta" : "Resposta errada"}
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.45, margin: comentario ? "0 0 4px" : 0 }}>
        Gabarito: <strong>{question.gabarito}</strong>
      </p>
      {comentario && <p style={{ fontSize: 13, color: "#566170", lineHeight: 1.5, margin: 0 }}>Comentário: {comentario}</p>}
      <style>{`
        @media (max-width: 640px) {
          .answer-feedback {
            padding: 12px !important;
            margin-top: 14px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
