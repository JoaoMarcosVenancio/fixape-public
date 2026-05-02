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
          Esta página resume as diretrizes de privacidade do site PasseiPMPE. A versão jurídica final será revisada conforme a plataforma web de questões evoluir.
        </p>
        {[
          ["Site estático", "Este site tem finalidade educacional e não exige login, cadastro, pagamento ou banco de dados para navegação."],
          ["Progresso local", "Respostas, favoritos, última questão visualizada e dados de progresso são salvos localmente no navegador do usuário, utilizando localStorage."],
          ["Sem envio para servidor", "No MVP estático, nenhum progresso de estudo é enviado para servidores. Também não há login ou cadastro obrigatório."],
          ["Contato e atualizações", "Esta política será revisada antes de qualquer mudança que envolva novos dados, conta de usuário ou sincronização online."],
        ].map(([title, text]) => (
          <section key={title} style={{ background: "#f8faff", border: "1px solid rgba(226,232,240,0.95)", borderRadius: 16, padding: "24px 26px", marginBottom: 14 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: "0 0 8px" }}>{title}</h2>
            <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{text}</p>
          </section>
        ))}
      </main>
    </StaticPageShell>
  );
}
