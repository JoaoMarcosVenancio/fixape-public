import Link from "next/link";
import { StaticPageShell } from "@/components/site/SiteChrome";

export default function SoldadoPmpePage() {
  const items = [
    "Língua Portuguesa",
    "História de Pernambuco",
    "Raciocínio Lógico",
    "Informática",
    "Direito Constitucional",
    "Direitos Humanos e Legislacao",
  ];

  return (
    <StaticPageShell>
      <main style={{ background: "#fff" }}>
        <section style={{ position: "relative", overflow: "hidden", padding: "92px 24px 80px", textAlign: "center" }}>
          <div
            style={{
              position: "absolute",
              top: "-25%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 900,
              height: 520,
              background: "radial-gradient(ellipse at 50% 10%, rgba(59,130,246,0.14) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#3b82f6", marginBottom: 14 }}>
              Soldado PMPE
            </p>
            <h1 style={{ fontSize: "clamp(34px, 6vw, 60px)", fontWeight: 800, letterSpacing: "-2px", color: "#111827", margin: "0 0 18px", lineHeight: 1.1 }}>
              Trilha web para estudar PMPE Soldado.
            </h1>
            <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.65, margin: "0 auto 34px", maxWidth: 620 }}>
              O PasseiPMPE será uma plataforma web estática para praticar questões gratuitas por matéria e tópico,
              revisar erros e acompanhar progresso no próprio navegador.
            </p>
            <Link
              href="#materias"
              style={{
                display: "inline-flex",
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                padding: "14px 30px",
                borderRadius: 980,
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(59,130,246,0.4)",
              }}
            >
              Ver matérias
            </Link>
          </div>
        </section>

        <section id="materias" style={{ background: "#f8faff", padding: "80px 24px", borderTop: "1px solid #e8edf8", borderBottom: "1px solid #e8edf8" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-1.2px", color: "#111827", margin: "0 0 14px", textAlign: "center" }}>
              Uma trilha enxuta para a prova de Soldado.
            </h2>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, margin: "0 auto 42px", maxWidth: 650, textAlign: "center" }}>
              A proposta é reduzir dispersão: abrir o site, escolher o assunto do edital e resolver questões em sessões curtas.
              A funcionalidade de questões entra na próxima fase.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {items.map((item) => (
                <div key={item} style={{ background: "#fff", border: "1px solid rgba(226,232,240,0.95)", borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 12px rgba(15,23,42,0.045)" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{item}</div>
                  <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 6 }}>Questões e revisão por tópico</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </StaticPageShell>
  );
}
