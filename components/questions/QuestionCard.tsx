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
      className="question-card"
      style={{
        background: "#fff",
        border: "1px solid #e3e8ef",
        borderRadius: 14,
        padding: 18,
        boxShadow: "0 1px 10px rgba(15,23,42,0.045)",
      }}
    >
      <header style={{ borderBottom: "1px solid #f1f4f8", paddingBottom: 10, marginBottom: 12 }}>
        <div className="question-card-meta" style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 750, color: "#2563eb", lineHeight: 1.4 }}>
            Questao {currentIndex + 1} de {total}
          </span>
          <div className="question-card-actions" style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: "#7b8494", lineHeight: 1.4 }}>
              {question.banca} - {question.ano}
            </span>
            <button
              type="button"
              onClick={onToggleFavorite}
              aria-pressed={isFavorite}
              style={{
                border: `1px solid ${isFavorite ? "rgba(245,158,11,0.5)" : "#e3e8ef"}`,
                background: isFavorite ? "rgba(245,158,11,0.10)" : "#fbfdff",
                color: isFavorite ? "#92400e" : "#6b7280",
                borderRadius: 980,
                minHeight: 30,
                padding: "5px 10px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {isFavorite ? "Favorita" : "Favoritar"}
            </button>
          </div>
        </div>
        <h1 className="question-card-title" style={{ fontSize: 18, lineHeight: 1.25, letterSpacing: 0, color: "#111827", margin: "0 0 4px", fontWeight: 780 }}>
          {getSubjectDisplayName(question.materia)}
        </h1>
        <p className="question-card-topic" style={{ fontSize: 12, color: "#7b8494", lineHeight: 1.45, margin: 0 }}>{question.topico}</p>
      </header>

      <p className="question-card-enunciation" style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.62, color: "#1f2937", margin: "0 0 12px", whiteSpace: "pre-wrap" }}>
        {question.enunciado}
      </p>

      <div style={{ display: "grid", gap: 6 }}>
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
                width: 26,
                height: 26,
                borderRadius: "50%",
                border: "1px solid currentColor",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 12,
                fontWeight: 750,
              }}
            >
              {key}
            </span>
            <span style={{ lineHeight: 1.55, minWidth: 0 }}>{question.alternativas[key]}</span>
          </button>
        ))}
      </div>

      {selectedAnswer && <AnswerFeedback question={question} selectedAnswer={selectedAnswer} />}

      <style>{`
        @media (max-width: 640px) {
          .question-card {
            border-radius: 14px !important;
            padding: 14px 12px !important;
          }
          .question-card-meta,
          .question-card-actions {
            align-items: flex-start !important;
          }
          .question-card-actions {
            width: 100%;
            justify-content: space-between !important;
          }
          .question-card-title {
            font-size: 17px !important;
            line-height: 1.24 !important;
          }
          .question-card-enunciation {
            font-size: 14px !important;
            line-height: 1.56 !important;
            margin-bottom: 12px !important;
          }
        }
      `}</style>
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
    minHeight: 46,
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    textAlign: "left",
    border: `1px solid ${isCorrect ? "rgba(22,163,74,0.58)" : isWrongSelection ? "rgba(220,38,38,0.55)" : "#e4e9f1"}`,
    background: isCorrect ? "rgba(22,163,74,0.075)" : isWrongSelection ? "rgba(220,38,38,0.065)" : "#fbfdff",
    color: isCorrect ? "#166534" : isWrongSelection ? "#991b1b" : "#374151",
    borderRadius: 12,
    padding: "9px 12px",
    fontSize: 14,
    fontWeight: isCorrect || isWrongSelection ? 600 : 400,
    cursor: answered ? "default" : "pointer",
    overflowWrap: "anywhere",
  };
}
