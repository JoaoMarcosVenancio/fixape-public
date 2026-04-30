import Link from "next/link";
import { StaticPageShell } from "@/components/site/SiteChrome";

export default function OficialPmpePage() {
  const pillars = [
    "Conteúdo programático separado por assunto",
    "Prática rápida para rotina diária",
    "Revisão de erros e pontos fracos",
    "Acompanhamento de progresso no Android",
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
              Oficial PMPE
            </p>
            <h1 style={{ fontSize: "clamp(34px, 6vw, 60px)", fontWeight: 800, letterSpacing: "-2px", color: "#111827", margin: "0 0 18px", lineHeight: 1.1 }}>
              Preparação para Oficial PMPE, sem plataforma pesada.
            </h1>
            <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.65, margin: "0 auto 34px", maxWidth: 620 }}>
              O caminho de Oficial será tratado como uma trilha própria no app, mantendo o mesmo foco: questões organizadas, progresso claro e revisão objetiva.
            </p>
            <Link
              href="/#download"
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
              Google Play em breve
            </Link>
          </div>
        </section>

        <section style={{ background: "#f8faff", padding: "80px 24px", borderTop: "1px solid #e8edf8", borderBottom: "1px solid #e8edf8" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-1.2px", color: "#111827", margin: "0 0 38px", textAlign: "center" }}>
              O mesmo método, adaptado ao edital de Oficial.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {pillars.map((item) => (
                <div key={item} style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: "24px 22px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.45 }}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </StaticPageShell>
  );
}

