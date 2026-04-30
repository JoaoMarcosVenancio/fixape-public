import { StaticPageShell } from "@/components/site/SiteChrome";

export default function PrivacidadePage() {
  return (
    <StaticPageShell>
      <main style={{ maxWidth: 820, margin: "0 auto", padding: "72px 24px 96px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#3b82f6", marginBottom: 14 }}>
          Institucional
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-1.6px", color: "#111827", margin: "0 0 18px" }}>
          Política de Privacidade
        </h1>
        <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.75, margin: "0 0 34px" }}>
          Esta página resume a direção de privacidade do site FixaPE. A versão jurídica final será atualizada antes da publicação oficial do app.
        </p>
        {[
          ["Site estático", "Este site tem finalidade informativa e não exige login, cadastro ou banco de dados para navegação."],
          ["App Android", "Quando disponível, o aplicativo poderá tratar dados de conta, respostas, progresso e preferências para entregar a experiência de estudo."],
          ["Contato e atualizações", "Esta política será revisada conforme o lançamento do app e a definição dos canais oficiais de suporte."],
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

