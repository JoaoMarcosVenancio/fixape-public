"use client";

export function QuestionNavigator({
  currentIndex,
  total,
  showPrevious = true,
  canGoPrevious,
  canGoNext,
  hasAnswered,
  onPrevious,
  onNext,
}: {
  currentIndex: number;
  total: number;
  showPrevious?: boolean;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  hasAnswered: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const previousDisabled = canGoPrevious === undefined ? currentIndex === 0 : !canGoPrevious;
  const nextDisabled = canGoNext === undefined ? currentIndex >= total - 1 : !canGoNext;

  return (
    <nav
      aria-label="Navegação entre questões"
      className="question-navigator"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginTop: 12,
        flexWrap: "wrap",
        background: "#fff",
        border: "1px solid rgba(226,232,240,0.95)",
        borderRadius: 16,
        padding: "10px 12px",
        boxShadow: "0 1px 6px rgba(15,23,42,0.035)",
      }}
    >
      {showPrevious ? (
        <button className="question-nav-button" type="button" onClick={onPrevious} disabled={previousDisabled} style={buttonStyle({ disabled: previousDisabled, primary: false })}>
          Anterior
        </button>
      ) : (
        <span aria-hidden="true" />
      )}
      <span className="question-navigator-count" style={{ fontSize: 12, color: "#7b8494", textAlign: "center", fontWeight: 650 }}>
        Questão {currentIndex + 1} de {total}
      </span>
      <button className="question-nav-button" type="button" onClick={onNext} disabled={nextDisabled} style={buttonStyle({ disabled: nextDisabled, primary: hasAnswered && !nextDisabled })}>
        Próxima
      </button>
      <style>{`
        .question-nav-button:focus-visible {
          outline: 3px solid rgba(59,130,246,0.18);
          outline-offset: 2px;
        }
        @media (max-width: 640px) {
          .question-navigator {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 8px !important;
            margin-top: 10px !important;
            padding: 10px !important;
            border-radius: 16px !important;
          }
          .question-navigator-count {
            grid-column: 1 / -1;
            grid-row: 1;
            padding: 2px 0 6px;
          }
          .question-navigator button {
            width: 100%;
            min-height: 46px !important;
          }
        }
      `}</style>
    </nav>
  );
}

function buttonStyle({ disabled, primary }: { disabled: boolean; primary: boolean }): React.CSSProperties {
  return {
    minHeight: 42,
    minWidth: 108,
    border: primary ? "1px solid rgba(37,99,235,0.18)" : "1px solid #d9e0ea",
    borderRadius: 980,
    background: disabled ? "#f5f7fa" : primary ? "linear-gradient(135deg,#2563eb,#3b82f6)" : "#fbfdff",
    color: disabled ? "#9ca3af" : primary ? "#fff" : "#111827",
    fontSize: 13,
    fontWeight: primary ? 800 : 700,
    cursor: disabled ? "not-allowed" : "pointer",
    padding: "0 14px",
    boxShadow: primary ? "0 8px 18px rgba(37,99,235,0.20)" : "none",
  };
}
