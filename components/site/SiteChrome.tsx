import Link from "next/link";

const linkStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#6b7280",
  textDecoration: "none",
  transition: "color 0.18s ease",
};

export function SiteHeader({ showQuestionsCta = true }: { showQuestionsCta?: boolean }) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(226,232,240,0.92)",
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
          className="site-brand-link"
          href="/"
          style={{
            fontWeight: 850,
            fontSize: "clamp(19px, 2vw, 21px)",
            letterSpacing: "-0.55px",
            textDecoration: "none",
            color: "#111827",
            lineHeight: 1,
          }}
        >
          Passei
          <span
            style={{
              background: "linear-gradient(135deg,#2563eb,#3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PMPE
          </span>
        </Link>

        <div className="site-header-links" style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Link className="site-header-blog" href="/blog" style={linkStyle}>
            Blog
          </Link>
          <Link href="/progresso" style={linkStyle}>
            Progresso
          </Link>
          {showQuestionsCta && (
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
                transition: "transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease",
              }}
            >
              Come&ccedil;ar quest&otilde;es
            </Link>
          )}
        </div>
      </div>
      <style>{`
        .site-brand-link,
        .site-header-links a {
          outline: none;
        }
        .site-header-links a:not(.site-header-cta):hover {
          color: #111827 !important;
        }
        .site-header-cta:hover {
          transform: translateY(-1px);
          filter: saturate(1.05);
        }
        .site-header-cta:active {
          transform: translateY(0) scale(0.99);
        }
        .site-brand-link:focus-visible,
        .site-header-links a:focus-visible {
          outline: 3px solid rgba(59,130,246,0.20);
          outline-offset: 4px;
          border-radius: 10px;
        }
        @media (max-width: 640px) {
          .site-header-inner {
            min-height: 52px !important;
            padding: 0 14px !important;
            gap: 12px !important;
          }
          .site-header-links {
            gap: 12px !important;
            flex-wrap: nowrap !important;
          }
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
    <footer style={{ background: "#fff", padding: "22px 24px", borderTop: "1px solid rgba(226,232,240,0.92)" }}>
      <div
        className="site-footer-inner"
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 18,
          flexWrap: "wrap",
        }}
      >
        <p style={{ fontSize: 13, lineHeight: 1.5, color: "#8b95a5", margin: 0 }}>
          PasseiPMPE - PMPE Soldado na web - 2026
        </p>
        <div className="site-footer-links" style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Link className="site-footer-link" href="/blog" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none", padding: "6px 8px", borderRadius: 8 }}>
            Blog
          </Link>
          <Link className="site-footer-link" href="/progresso" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none", padding: "6px 8px", borderRadius: 8 }}>
            Progresso
          </Link>
          <Link className="site-footer-link" href="/privacidade" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none", padding: "6px 8px", borderRadius: 8 }}>
            Privacidade
          </Link>
          <Link className="site-footer-link" href="/termos" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none", padding: "6px 8px", borderRadius: 8 }}>
            Termos
          </Link>
        </div>
      </div>
      <style>{`
        .site-footer-link {
          transition: color 0.18s ease, background 0.18s ease;
          outline: none;
        }
        .site-footer-link:hover {
          color: #111827 !important;
          background: rgba(15,23,42,0.035);
        }
        .site-footer-link:focus-visible {
          outline: 3px solid rgba(59,130,246,0.18);
          outline-offset: 2px;
          border-radius: 8px;
        }
        @media (max-width: 640px) {
          .site-footer-inner {
            justify-content: center !important;
            text-align: center;
            gap: 10px !important;
          }
          .site-footer-links {
            justify-content: center !important;
            gap: 2px !important;
          }
        }
      `}</style>
    </footer>
  );
}

export function StaticPageShell({ children, showQuestionsCta = true }: { children: React.ReactNode; showQuestionsCta?: boolean }) {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <SiteHeader showQuestionsCta={showQuestionsCta} />
      {children}
      <SiteFooter />
    </div>
  );
}
