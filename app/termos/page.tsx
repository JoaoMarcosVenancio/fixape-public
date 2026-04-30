import { StaticPageShell } from "@/components/site/SiteChrome";

export default function TermosPage() {
  return (
    <StaticPageShell>
      <main style={{ maxWidth: 820, margin: "0 auto", padding: "72px 24px 96px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#3b82f6", marginBottom: 14 }}>
          Institucional
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-1.6px", color: "#111827", margin: "0 0 18px" }}>
          Termos de Uso
        </h1>
        <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.75, margin: "0 0 34px" }}>
          Estes termos iniciais posicionam o FixaPE como site informativo e app de estudo em preparação. A versão final será revisada antes do lançamento público.
        </p>
        {[
          ["Uso do site", "O website apresenta informações sobre o FixaPE, páginas institucionais e conteúdo de blog sobre preparação para PMPE."],
          ["Conteúdo educacional", "Materiais e textos têm finalidade educacional e informativa. O candidato deve sempre consultar editais e fontes oficiais."],
          ["Aplicativo", "As funcionalidades operacionais de estudo, conta e progresso pertencem ao app Android e ao backend associado, não ao site estático."],
        ].map(([title, text]) => (
          <section key={title} style={{ background: "#f8faff", border: "1px solid #e8edf8", borderRadius: 18, padding: "24px 26px", marginBottom: 14 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: "0 0 8px" }}>{title}</h2>
            <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{text}</p>
          </section>
        ))}
      </main>
    </StaticPageShell>
  );
}

