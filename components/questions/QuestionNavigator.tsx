"use client";

export function QuestionNavigator({
  currentIndex,
  total,
  onPrevious,
  onNext,
}: {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <nav
      aria-label="Navegacao entre questoes"
      className="question-navigator"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        marginTop: 10,
        flexWrap: "wrap",
        background: "#fff",
        border: "1px solid #e3e8ef",
        borderRadius: 14,
        padding: "8px 10px",
        boxShadow: "0 1px 6px rgba(15,23,42,0.035)",
      }}
    >
      <button type="button" onClick={onPrevious} disabled={currentIndex === 0} style={buttonStyle(currentIndex === 0)}>
        Anterior
      </button>
      <span className="question-navigator-count" style={{ fontSize: 12, color: "#7b8494", textAlign: "center", fontWeight: 650 }}>
        Questao {currentIndex + 1} de {total}
      </span>
      <button type="button" onClick={onNext} disabled={currentIndex >= total - 1} style={buttonStyle(currentIndex >= total - 1)}>
        Proxima
      </button>
      <style>{`
        @media (max-width: 640px) {
          .question-navigator {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 6px !important;
            margin-top: 6px !important;
            padding: 8px !important;
          }
          .question-navigator-count {
            grid-column: 1 / -1;
            grid-row: 1;
            padding: 2px 0 4px;
          }
          .question-navigator button {
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
}

function buttonStyle(disabled: boolean): React.CSSProperties {
  return {
    minHeight: 40,
    minWidth: 108,
    border: "1px solid #d9e0ea",
    borderRadius: 980,
    background: disabled ? "#f5f7fa" : "#fbfdff",
    color: disabled ? "#9ca3af" : "#111827",
    fontSize: 13,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    padding: "0 14px",
  };
}
