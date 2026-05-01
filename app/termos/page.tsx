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
          Estes termos iniciais posicionam o FixaPE como uma plataforma web estatica para estudo de PMPE Soldado. A versao final sera revisada antes do lancamento publico do fluxo de questoes.
        </p>
        {[
          ["Uso do site", "O website apresenta informacoes sobre o FixaPE, paginas institucionais, blog e a futura experiencia de questoes gratuitas para PMPE Soldado."],
          ["Conteudo educacional", "Materiais e textos tem finalidade educacional e informativa. O candidato deve sempre consultar editais e fontes oficiais."],
          ["Plataforma web", "Nesta etapa, o FixaPE nao usa login, pagamento, backend ou banco de dados. Funcionalidades de pratica serao adicionadas de forma estatica e local."],
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
