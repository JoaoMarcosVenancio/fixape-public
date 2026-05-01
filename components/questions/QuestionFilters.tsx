"use client";

import { getSubjectDisplayName } from "@/lib/questions/display";

type FilterValue = {
  subject: string;
  topic: string;
  board: string;
  year: string;
  status: string;
};

export function QuestionFilters({
  subjects,
  topics,
  boards,
  years,
  value,
  onChange,
}: {
  subjects: string[];
  topics: string[];
  boards: string[];
  years: string[];
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}) {
  function updateFilter(key: keyof FilterValue, nextValue: string) {
    onChange({ ...value, [key]: nextValue, ...(key === "subject" ? { topic: "" } : {}) });
  }

  return (
    <section
      style={{
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div className="question-filter-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1.35fr) 0.8fr 0.8fr 0.9fr", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 750, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Materia
          </span>
          <select value={value.subject} onChange={(event) => updateFilter("subject", event.target.value)} style={selectStyle}>
            <option value="">Todas</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {getSubjectDisplayName(subject)}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 750, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Topico
          </span>
          <select
            value={value.topic}
            onChange={(event) => updateFilter("topic", event.target.value)}
            disabled={!value.subject || topics.length === 0}
            style={{ ...selectStyle, color: !value.subject || topics.length === 0 ? "#9ca3af" : "#111827" }}
          >
            <option value="">{value.subject ? "Todos" : "Selecione uma materia"}</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 750, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Banca
          </span>
          <select value={value.board} onChange={(event) => updateFilter("board", event.target.value)} style={selectStyle}>
            <option value="">Todas</option>
            {boards.map((board) => (
              <option key={board} value={board}>
                {board}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 750, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Ano
          </span>
          <select value={value.year} onChange={(event) => updateFilter("year", event.target.value)} style={selectStyle}>
            <option value="">Todos</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 750, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Status
          </span>
          <select value={value.status} onChange={(event) => updateFilter("status", event.target.value)} style={selectStyle}>
            <option value="">Todos</option>
            <option value="unanswered">Nao respondidas</option>
            <option value="answered">Respondidas</option>
            <option value="wrong">Erradas</option>
            <option value="favorites">Favoritas</option>
          </select>
        </label>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .question-filter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 44,
  border: "1.5px solid #e5e7eb",
  borderRadius: 10,
  background: "#fff",
  color: "#111827",
  fontSize: 14,
  padding: "0 12px",
};
