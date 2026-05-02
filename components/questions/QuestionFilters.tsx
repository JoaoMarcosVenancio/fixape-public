"use client";

import { useState } from "react";
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

  const [open, setOpen] = useState(false);
  const activeCount = [value.subject, value.topic, value.board, value.year, value.status].filter(Boolean).length;

  return (
    <section
      className="question-filters"
      style={{
        background: "rgba(255,255,255,0.82)",
        border: "1px solid rgba(226,232,240,0.95)",
        borderRadius: 14,
        padding: "12px 14px 14px",
        boxShadow: "0 1px 8px rgba(15,23,42,0.035)",
      }}
    >
      <button
        type="button"
        className="question-filter-toggle"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        style={{
          width: "100%",
          minHeight: 46,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          border: "none",
          background: "transparent",
          color: "#111827",
          padding: 0,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ display: "grid", gap: 3, minWidth: 0 }}>
          <strong style={{ fontSize: 14, fontWeight: 780 }}>Filtros</strong>
          <span style={{ fontSize: 12, color: "#6b7280" }}>
            {activeCount > 0 ? `${activeCount} filtro${activeCount === 1 ? "" : "s"} ativo${activeCount === 1 ? "" : "s"}` : "Todas as questões"}
          </span>
        </span>
        <span
          aria-hidden="true"
          style={{
            width: 30,
            height: 30,
            borderRadius: 999,
            border: "1px solid rgba(37,99,235,0.18)",
            background: "rgba(37,99,235,0.06)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2563eb",
            fontWeight: 750,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.18s ease",
          }}
        >
          v
        </span>
      </button>

      <div
        className={`question-filter-grid ${open ? "is-open" : ""}`}
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1.35fr) 0.8fr 0.8fr 0.9fr",
          gap: 9,
          marginTop: 0,
        }}
      >
        <label style={{ display: "grid", gap: 5 }}>
          <span style={filterLabelStyle}>
            Matéria
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

        <label style={{ display: "grid", gap: 5 }}>
          <span style={filterLabelStyle}>
            Tópico
          </span>
          <select
            value={value.topic}
            onChange={(event) => updateFilter("topic", event.target.value)}
            disabled={!value.subject || topics.length === 0}
            style={{ ...selectStyle, color: !value.subject || topics.length === 0 ? "#9ca3af" : "#111827" }}
          >
            <option value="">{value.subject ? "Todos" : "Selecione uma matéria"}</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 5 }}>
          <span style={filterLabelStyle}>
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

        <label style={{ display: "grid", gap: 5 }}>
          <span style={filterLabelStyle}>
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

        <label style={{ display: "grid", gap: 5 }}>
          <span style={filterLabelStyle}>
            Status
          </span>
          <select value={value.status} onChange={(event) => updateFilter("status", event.target.value)} style={selectStyle}>
            <option value="">Todos</option>
            <option value="unanswered">Não respondidas</option>
            <option value="answered">Respondidas</option>
            <option value="wrong">Erradas</option>
            <option value="favorites">Favoritas</option>
          </select>
        </label>
      </div>

      <style>{`
        .question-filter-toggle { display: none !important; }
        .question-filter-toggle:focus-visible,
        .question-filter-grid select:focus-visible {
          outline: 3px solid rgba(59,130,246,0.18);
          outline-offset: 2px;
        }
        @media (max-width: 720px) {
          .question-filters {
            padding: 12px !important;
            border-radius: 16px !important;
          }
          .question-filter-toggle { display: flex !important; }
          .question-filter-grid { grid-template-columns: 1fr !important; }
          .question-filter-grid:not(.is-open) { display: none !important; }
          .question-filter-grid.is-open {
            margin-top: 12px !important;
            gap: 12px !important;
          }
          .question-filter-grid select {
            min-height: 44px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 40,
  border: "1px solid #e3e8ef",
  borderRadius: 10,
  background: "#fbfdff",
  color: "#1f2937",
  fontSize: 13,
  padding: "0 10px",
};

const filterLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: "#7b8494",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};
