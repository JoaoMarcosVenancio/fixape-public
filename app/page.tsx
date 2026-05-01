"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const primaryButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  fontWeight: 750,
  color: "#fff",
  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
  padding: "14px 30px",
  borderRadius: 980,
  textDecoration: "none",
  boxShadow: "0 4px 24px rgba(59,130,246,0.4)",
  transition: "transform 0.2s, box-shadow 0.2s",
  whiteSpace: "nowrap",
};

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="home-cta"
      style={primaryButtonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 6px 32px rgba(59,130,246,0.52)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(59,130,246,0.4)";
      }}
    >
      {children}
    </Link>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s, box-shadow 0.3s",
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: `1px solid ${scrolled ? "rgba(0,0,0,0.08)" : "transparent"}`,
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "0 28px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Link href="/" style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px", color: "#111827", textDecoration: "none" }}>
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

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Link href="/blog" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
            Blog
          </Link>
          <Link href="/progresso" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
            Progresso
          </Link>
          <div className="nav-cta">
            <Link
              href="/questoes"
              style={{
                fontSize: 14,
                fontWeight: 750,
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
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "112px 24px 78px",
        overflow: "hidden",
        background: "linear-gradient(180deg,#ffffff 0%,#f8faff 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.10) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
        <h1
          style={{
            fontSize: "clamp(38px, 7vw, 78px)",
            fontWeight: 850,
            lineHeight: 1.06,
            letterSpacing: 0,
            margin: "0 0 24px",
            color: "#111827",
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.1s",
          }}
        >
          Pratique quest&otilde;es para{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #16a34a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PMPE Soldado.
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2.2vw, 20px)",
            color: "#6b7280",
            maxWidth: 660,
            margin: "0 auto 42px",
            lineHeight: 1.65,
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.25s",
          }}
        >
          Treine para PMPE Soldado com quest&otilde;es gratuitas, mat&eacute;rias do edital, revis&atilde;o de erros e progresso salvo no pr&oacute;prio navegador.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.4s",
          }}
        >
          <PrimaryLink href="/questoes">Come&ccedil;ar quest&otilde;es</PrimaryLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#fff", padding: "28px 24px", textAlign: "center", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>
          FixaPE - PMPE Soldado na web - {new Date().getFullYear()}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <Link href="/blog" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
            Blog
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

const globalStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: #fff; }
  @media (max-width: 760px) {
    .nav-cta { display: none; }
  }
  @media (max-width: 640px) {
    section {
      overflow-wrap: anywhere;
    }
    .home-cta {
      width: 100% !important;
      min-height: 48px !important;
      padding-left: 18px !important;
      padding-right: 18px !important;
    }
  }
  @media (max-width: 460px) {
    nav div[style*="gap: 22px"] { gap: 14px !important; }
  }
`;

export default function Home() {
  return (
    <>
      <style>{globalStyles}</style>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
