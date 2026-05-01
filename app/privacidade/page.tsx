import { StaticPageShell } from "@/components/site/SiteChrome";

export default function PrivacidadePage() {
  return (
    <StaticPageShell>
      <main style={{ maxWidth: 820, margin: "0 auto", padding: "72px 24px 96px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#3b82f6", marginBottom: 14 }}>
          Institucional
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-1.6px", color: "#111827", margin: "0 0 18px" }}>
          Politica de Privacidade
        </h1>
        <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.75, margin: "0 0 34px" }}>
          Esta pagina resume a direcao de privacidade do site FixaPE. A versao juridica final sera revisada conforme a plataforma web de questoes evoluir.
        </p>
        {[
          ["Site estatico", "Este site tem finalidade educacional e nao exige login, cadastro, pagamento ou banco de dados para navegacao."],
          ["Progresso local", "Respostas, favoritos, ultima questao vista e progresso sao salvos localmente no navegador usando localStorage."],
          ["Sem envio para servidor", "No MVP estatico, nenhum progresso de estudo e enviado para servidor e nenhum login e necessario."],
          ["Contato e atualizacoes", "Esta politica sera revisada antes de qualquer mudanca que envolva novos dados, conta de usuario ou sincronizacao online."],
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
