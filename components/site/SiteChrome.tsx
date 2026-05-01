import Link from "next/link";

const linkStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#6b7280",
  textDecoration: "none",
};

export function SiteHeader() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(226,232,240,0.9)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.7), 0 8px 24px rgba(15,23,42,0.035)",
      }}
    >
      <div
        className="site-header-inner"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px",
          minHeight: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 850,
            fontSize: 19,
            letterSpacing: "-0.4px",
            textDecoration: "none",
            color: "#111827",
            lineHeight: 1,
          }}
        >
          Fixa
          <span
            style={{
              background: "linear-gradient(135deg,#2563eb,#3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PE
          </span>
        </Link>

        <div className="site-header-links" style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Link className="site-header-blog" href="/blog" style={linkStyle}>
            Blog
          </Link>
          <Link href="/progresso" style={linkStyle}>
            Progresso
          </Link>
          <Link
            className="site-header-cta"
            href="/questoes"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              background: "linear-gradient(135deg,#2563eb,#3b82f6)",
              padding: "9px 18px",
              borderRadius: 980,
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(37,99,235,0.24)",
            }}
          >
            Come&ccedil;ar quest&otilde;es
          </Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .site-header-inner {
            min-height: 48px !important;
            padding: 0 14px !important;
            gap: 12px !important;
          }
          .site-header-links {
            gap: 0 !important;
            flex-wrap: nowrap !important;
          }
          .site-header-blog,
          .site-header-cta {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer style={{ background: "#fff", padding: "28px 24px", borderTop: "1px solid #e5e7eb" }}>
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>
          FixaPE - PMPE Soldado na web - {new Date().getFullYear()}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <Link href="/blog" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
            Blog
          </Link>
          <Link href="/progresso" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
            Progresso
          </Link>
          <Link href="/privacidade" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
            Privacidade
          </Link>
          <Link href="/termos" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
            Termos
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function StaticPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
