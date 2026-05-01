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
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginTop: 18,
        flexWrap: "wrap",
      }}
    >
      <button type="button" onClick={onPrevious} disabled={currentIndex === 0} style={buttonStyle(currentIndex === 0)}>
        Anterior
      </button>
      <span style={{ fontSize: 13, color: "#6b7280" }}>
        Questao {currentIndex + 1} de {total}
      </span>
      <button type="button" onClick={onNext} disabled={currentIndex >= total - 1} style={buttonStyle(currentIndex >= total - 1)}>
        Proxima
      </button>
    </nav>
  );
}

function buttonStyle(disabled: boolean): React.CSSProperties {
  return {
    minHeight: 44,
    minWidth: 116,
    border: "1.5px solid #d1d5db",
    borderRadius: 980,
    background: disabled ? "#f3f4f6" : "#fff",
    color: disabled ? "#9ca3af" : "#111827",
    fontSize: 14,
    fontWeight: 750,
    cursor: disabled ? "not-allowed" : "pointer",
  };
}
