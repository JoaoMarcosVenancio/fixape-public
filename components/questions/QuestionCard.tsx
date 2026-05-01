"use client";

import { getSubjectDisplayName } from "@/lib/questions/display";
import type { AlternativeKey, SoldadoQuestion } from "@/lib/questions/types";
import { AnswerFeedback } from "./AnswerFeedback";

const ALTERNATIVE_KEYS = ["A", "B", "C", "D", "E"] as const satisfies readonly AlternativeKey[];

export function QuestionCard({
  question,
  currentIndex,
  total,
  selectedAnswer,
  isFavorite,
  onSelectAnswer,
  onToggleFavorite,
}: {
  question: SoldadoQuestion;
  currentIndex: number;
  total: number;
  selectedAnswer: AlternativeKey | null;
  isFavorite: boolean;
  onSelectAnswer: (answer: AlternativeKey) => void;
  onToggleFavorite: () => void;
}) {
  return (
    <article
      style={{
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderRadius: 18,
        padding: "clamp(20px, 4vw, 34px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      <header style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: 18, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#2563eb" }}>
            Questao {currentIndex + 1} de {total}
          </span>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              {question.banca} - {question.ano}
            </span>
            <button
              type="button"
              onClick={onToggleFavorite}
              aria-pressed={isFavorite}
              style={{
                border: `1.5px solid ${isFavorite ? "#f59e0b" : "#e5e7eb"}`,
                background: isFavorite ? "rgba(245,158,11,0.12)" : "#fff",
                color: isFavorite ? "#92400e" : "#6b7280",
                borderRadius: 980,
                padding: "7px 12px",
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {isFavorite ? "Favorita" : "Favoritar"}
            </button>
          </div>
        </div>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 34px)", lineHeight: 1.18, letterSpacing: "-0.8px", color: "#111827", margin: "0 0 14px", fontWeight: 850 }}>
          {getSubjectDisplayName(question.materia)}
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.55, margin: 0 }}>{question.topico}</p>
      </header>

      <p style={{ fontSize: 17, lineHeight: 1.75, color: "#1f2937", margin: "0 0 22px", whiteSpace: "pre-wrap" }}>
        {question.enunciado}
      </p>

      <div style={{ display: "grid", gap: 10 }}>
        {ALTERNATIVE_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelectAnswer(key)}
            disabled={selectedAnswer !== null}
            style={getAlternativeStyle({ key, selectedAnswer, correctAnswer: question.gabarito })}
          >
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "1.5px solid currentColor",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 13,
                fontWeight: 850,
              }}
            >
              {key}
            </span>
            <span style={{ lineHeight: 1.55 }}>{question.alternativas[key]}</span>
          </button>
        ))}
      </div>

      {selectedAnswer && <AnswerFeedback question={question} selectedAnswer={selectedAnswer} />}
    </article>
  );
}

function getAlternativeStyle({
  key,
  selectedAnswer,
  correctAnswer,
}: {
  key: AlternativeKey;
  selectedAnswer: AlternativeKey | null;
  correctAnswer: AlternativeKey;
}): React.CSSProperties {
  const answered = selectedAnswer !== null;
  const isCorrect = answered && key === correctAnswer;
  const isWrongSelection = answered && key === selectedAnswer && selectedAnswer !== correctAnswer;

  return {
    width: "100%",
    minHeight: 58,
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    textAlign: "left",
    border: `1.5px solid ${isCorrect ? "#16a34a" : isWrongSelection ? "#dc2626" : "#e5e7eb"}`,
    background: isCorrect ? "rgba(22,163,74,0.08)" : isWrongSelection ? "rgba(220,38,38,0.07)" : "#fff",
    color: isCorrect ? "#166534" : isWrongSelection ? "#991b1b" : "#374151",
    borderRadius: 14,
    padding: "14px 16px",
    fontSize: 15,
    fontWeight: 600,
    cursor: answered ? "default" : "pointer",
  };
}
