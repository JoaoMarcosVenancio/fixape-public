import Link from "next/link";
import { StaticPageShell } from "@/components/site/SiteChrome";

export default function OficialPmpePage() {
  const pillars = [
    "Conteudo programatico separado por assunto",
    "Pratica rapida para rotina diaria",
    "Revisao de erros e pontos fracos",
    "Acompanhamento de progresso no navegador",
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
              Trilha de Oficial PMPE planejada para uma etapa futura.
            </h1>
            <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.65, margin: "0 auto 34px", maxWidth: 620 }}>
              O foco atual do PasseiPMPE é PMPE Soldado. Esta página permanece no código para uso futuro, mas não faz parte do MVP atual.
            </p>
            <Link
              href="/soldado-pmpe"
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
              Ver PMPE Soldado
            </Link>
          </div>
        </section>

        <section style={{ background: "#f8faff", padding: "80px 24px", borderTop: "1px solid #e8edf8", borderBottom: "1px solid #e8edf8" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-1.2px", color: "#111827", margin: "0 0 38px", textAlign: "center" }}>
              Estrutura preservada para evolucao posterior.
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
