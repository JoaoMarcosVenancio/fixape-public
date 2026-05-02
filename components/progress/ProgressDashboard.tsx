"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getSubjectDisplayName } from "@/lib/questions/display";
import { buildQuestionsUrl } from "@/lib/questions/urls";
import type { SoldadoQuestion } from "@/lib/questions/types";
import { clearProgress, getInitialProgress, loadProgress } from "@/lib/progress/storage";
import { calculateProgressBySubject, calculateProgressStats } from "@/lib/progress/stats";
import type { SoldadoProgress } from "@/lib/progress/types";

export function ProgressDashboard({ questions }: { questions: SoldadoQuestion[] }) {
  const [progress, setProgress] = useState<SoldadoProgress>(() => getInitialProgress());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setReady(true);
  }, []);

  const stats = useMemo(() => calculateProgressStats(progress), [progress]);
  const bySubject = useMemo(() => calculateProgressBySubject(questions, progress), [questions, progress]);

  function handleClearProgress() {
    const confirmed = window.confirm("Tem certeza que deseja zerar seu progresso local? Esta ação não pode ser desfeita.");
    if (!confirmed) return;
    setProgress(clearProgress());
  }

  return (
    <main style={{ background: "#f8faff", minHeight: "100vh" }}>
      <section className="progress-hero" style={{ background: "#fff", borderBottom: "1px solid rgba(226,232,240,0.92)", padding: "48px 24px 30px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 12px" }}>
            Progresso PMPE Soldado
          </p>
          <h1 className="progress-title" style={{ fontSize: 48, lineHeight: 1.08, letterSpacing: 0, color: "#111827", margin: "0 0 16px", fontWeight: 850 }}>
            Seu desempenho neste navegador.
          </h1>
          <p className="progress-description" style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.65, maxWidth: 700, margin: 0 }}>
            As informações abaixo ficam salvas em localStorage. Não há login, servidor ou sincronização nesta versão estática.
          </p>
        </div>
      </section>

      <section className="progress-body" style={{ padding: "24px 24px 88px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 18 }}>
          <div className="progress-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
            {[
              ["Respondidas", stats.totalAnswered],
              ["Acertos", stats.totalCorrect],
              ["Erros", stats.totalWrong],
              ["Aproveitamento", `${stats.accuracyPercentage}%`],
              ["Favoritas", stats.favoriteCount],
            ].map(([label, value]) => (
              <section key={label} style={metricCardStyle}>
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>{label}</div>
                <div style={{ fontSize: 30, fontWeight: 850, color: "#111827", lineHeight: 1 }}>{ready ? value : "-"}</div>
              </section>
            ))}
          </div>

          <section className="progress-actions-card" style={{ background: "#fff", border: "1px solid rgba(226,232,240,0.95)", borderRadius: 16, padding: 18, boxShadow: "0 2px 14px rgba(15,23,42,0.045)" }}>
            <div className="progress-actions" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="progress-primary-action" href={buildQuestionsUrl()} style={primaryLinkStyle}>
                Continuar questões
              </Link>
              <Link className="progress-secondary-action" href={buildQuestionsUrl({ status: "wrong" })} style={secondaryLinkStyle}>
                Revisar erros
              </Link>
              <Link className="progress-secondary-action" href={buildQuestionsUrl({ status: "favorites" })} style={secondaryLinkStyle}>
                Ver favoritas
              </Link>
              <button className="progress-danger-action" type="button" onClick={handleClearProgress} style={dangerButtonStyle}>
                Zerar progresso
              </button>
            </div>
          </section>

          <section className="progress-subjects-card" style={{ background: "#fff", border: "1px solid rgba(226,232,240,0.95)", borderRadius: 16, padding: "26px", boxShadow: "0 2px 14px rgba(15,23,42,0.045)" }}>
            <h2 style={{ fontSize: 20, fontWeight: 850, color: "#111827", margin: "0 0 18px" }}>Progresso por matéria</h2>
            <div className="progress-subject-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
              {bySubject.map((subject) => (
                <article key={subject.subject} style={{ border: "1px solid rgba(226,232,240,0.95)", borderRadius: 14, padding: 16, background: "#fff" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 850, color: "#111827", margin: "0 0 12px", lineHeight: 1.35 }}>
                    {getSubjectDisplayName(subject.subject)}
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8, marginBottom: 14 }}>
                    <Metric label="Total" value={subject.total} />
                    <Metric label="Respondidas" value={subject.answered} />
                    <Metric label="Acertos" value={subject.correct} />
                    <Metric label="Erros" value={subject.wrong} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#6b7280" }}>Aproveitamento</span>
                    <strong style={{ fontSize: 13, color: "#111827" }}>{subject.accuracyPercentage}%</strong>
                  </div>
                  <div style={{ height: 8, background: "#eef2ff", borderRadius: 980, overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${subject.total === 0 ? 0 : Math.round((subject.answered / subject.total) * 100)}%`,
                        height: "100%",
                        background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                      }}
                    />
                  </div>
                  <div className="progress-subject-actions" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                    <Link className="progress-small-action" href={buildQuestionsUrl({ materia: subject.subject })} style={smallLinkStyle}>
                      Estudar matéria
                    </Link>
                    <Link className="progress-small-action" href={buildQuestionsUrl({ materia: subject.subject, status: "wrong" })} style={smallLinkStyle}>
                      Revisar erros
                    </Link>
                    <Link className="progress-small-action" href={buildQuestionsUrl({ materia: subject.subject, status: "favorites" })} style={smallLinkStyle}>
                      Ver favoritas
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
      <style>{`
        .progress-primary-action,
        .progress-secondary-action,
        .progress-danger-action,
        .progress-small-action {
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease;
          outline: none;
        }
        .progress-primary-action:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(37,99,235,0.20) !important;
        }
        .progress-secondary-action:hover,
        .progress-small-action:hover {
          border-color: rgba(37,99,235,0.34) !important;
          background: rgba(37,99,235,0.04) !important;
        }
        .progress-danger-action:hover {
          border-color: rgba(220,38,38,0.38) !important;
          background: rgba(220,38,38,0.035) !important;
        }
        .progress-primary-action:active,
        .progress-secondary-action:active,
        .progress-danger-action:active,
        .progress-small-action:active {
          transform: scale(0.99);
        }
        .progress-primary-action:focus-visible,
        .progress-secondary-action:focus-visible,
        .progress-danger-action:focus-visible,
        .progress-small-action:focus-visible {
          outline: 3px solid rgba(59,130,246,0.18);
          outline-offset: 3px;
        }
        @media (max-width: 640px) {
          .progress-hero {
            padding: 32px 16px 24px !important;
          }
          .progress-title {
            font-size: 32px !important;
            line-height: 1.14 !important;
          }
          .progress-description {
            font-size: 15px !important;
            line-height: 1.6 !important;
          }
          .progress-body {
            padding: 14px 12px 72px !important;
          }
          .progress-metrics {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 10px !important;
          }
          .progress-actions-card,
          .progress-subjects-card {
            padding: 16px !important;
            border-radius: 14px !important;
          }
          .progress-actions,
          .progress-subject-actions {
            display: grid !important;
            grid-template-columns: 1fr;
            width: 100%;
          }
          .progress-actions a,
          .progress-actions button,
          .progress-subject-actions a {
            width: 100%;
          }
          .progress-subject-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ background: "#f8faff", border: "1px solid rgba(226,232,240,0.9)", borderRadius: 12, padding: "10px 12px" }}>
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 850, color: "#111827" }}>{value}</div>
    </div>
  );
}

const metricCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid rgba(226,232,240,0.95)",
  borderRadius: 16,
  padding: "20px 18px",
  boxShadow: "0 2px 14px rgba(15,23,42,0.045)",
};

const primaryLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 48,
  color: "#fff",
  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
  borderRadius: 980,
  padding: "10px 18px",
  fontSize: 14,
  fontWeight: 800,
  textDecoration: "none",
  boxShadow: "0 8px 18px rgba(37,99,235,0.14)",
};

const secondaryLinkStyle: React.CSSProperties = {
  ...primaryLinkStyle,
  color: "#374151",
  background: "#fff",
  border: "1px solid #d9e0ea",
  boxShadow: "none",
};

const dangerButtonStyle: React.CSSProperties = {
  minHeight: 48,
  color: "#b91c1c",
  background: "#fff",
  border: "1px solid rgba(220,38,38,0.28)",
  borderRadius: 980,
  padding: "10px 18px",
  fontSize: 14,
  fontWeight: 800,
  cursor: "pointer",
};

const smallLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 40,
  color: "#2563eb",
  background: "#fff",
  border: "1px solid rgba(37,99,235,0.24)",
  borderRadius: 980,
  padding: "7px 12px",
  fontSize: 12,
  fontWeight: 800,
  textDecoration: "none",
};
