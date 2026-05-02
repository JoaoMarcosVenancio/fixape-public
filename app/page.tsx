"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroQuestionPreview } from "@/components/site/HeroQuestionPreview";

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
        <Link href="/" style={{ fontWeight: 850, fontSize: "clamp(19px, 2vw, 21px)", letterSpacing: "-0.55px", color: "#111827", textDecoration: "none" }}>
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

      <div className="hero-inner" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1120 }}>
        <div className="hero-copy">
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
        <HeroQuestionPreview />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#fff", padding: "28px 24px", textAlign: "center", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>
          PasseiPMPE - PMPE Soldado na web - 2026
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
  @keyframes questionFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: #fff; }
  .hero-inner {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
    align-items: center;
    gap: clamp(32px, 6vw, 72px);
  }
  .hero-copy {
    text-align: left;
  }
  .hero-copy p {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .hero-copy > div {
    justify-content: flex-start !important;
  }
  .question-visual {
    display: flex;
    justify-content: center;
    animation: fadeUp 0.6s ease both;
    animation-delay: 0.52s;
  }
  @media (min-width: 761px) {
    .question-visual {
      transform: translateY(-12px);
    }
  }
  .question-card {
    position: relative;
    width: min(100%, 390px);
    min-height: 374px;
    border: 1px solid rgba(226,232,240,0.95);
    border-radius: 26px;
    background: rgba(255,255,255,0.86);
    box-shadow: 0 24px 70px rgba(15,23,42,0.12);
    padding: 20px;
    backdrop-filter: blur(18px) saturate(170%);
    -webkit-backdrop-filter: blur(18px) saturate(170%);
    animation: questionFloat 5.5s ease-in-out infinite;
  }
  .question-card::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .question-card-content {
    min-height: 334px;
    transition: opacity 360ms cubic-bezier(0.22, 1, 0.36, 1), transform 360ms cubic-bezier(0.22, 1, 0.36, 1), filter 360ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;
  }
  .question-card-content.is-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }
  .question-card-content.is-leaving {
    opacity: 0;
    transform: translate3d(0, -8px, 0);
    filter: blur(1px);
  }
  .question-card-content.is-entering {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
    filter: blur(1px);
  }
  .question-card-content.is-active .question-card-header {
    transition-delay: 25ms;
  }
  .question-card-content.is-active .question-enunciado {
    transition-delay: 70ms;
  }
  .question-card-content.is-active .question-option:nth-child(1) { transition-delay: 105ms; }
  .question-card-content.is-active .question-option:nth-child(2) { transition-delay: 125ms; }
  .question-card-content.is-active .question-option:nth-child(3) { transition-delay: 145ms; }
  .question-card-content.is-active .question-option:nth-child(4) { transition-delay: 165ms; }
  .question-card-content.is-active .question-option:nth-child(5) { transition-delay: 185ms; }
  .question-card-content.is-leaving .question-card-header,
  .question-card-content.is-leaving .question-enunciado,
  .question-card-content.is-leaving .question-option {
    opacity: 0;
    transform: translate3d(0, -4px, 0);
  }
  .question-card-content.is-entering .question-card-header,
  .question-card-content.is-entering .question-enunciado,
  .question-card-content.is-entering .question-option {
    opacity: 0;
    transform: translate3d(0, 6px, 0);
  }
  .question-card-content.is-active .question-card-header,
  .question-card-content.is-active .question-enunciado,
  .question-card-content.is-active .question-option {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .question-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    margin-bottom: 14px;
    transition: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .question-card-header strong {
    display: block;
    min-width: 0;
    font-size: 12.5px;
    font-weight: 750;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .result-pill {
    flex-shrink: 0;
    font-size: 10.5px;
    font-weight: 700;
    border-radius: 999px;
    padding: 5px 8px;
    min-width: 92px;
    text-align: center;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 280ms cubic-bezier(0.22, 1, 0.36, 1), transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .result-pill.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .result-pill.is-correct {
    color: #166534;
    background: rgba(22,163,74,0.08);
    border: 1px solid rgba(22,163,74,0.16);
  }
  .result-pill.is-wrong {
    color: #991b1b;
    background: rgba(220,38,38,0.07);
    border: 1px solid rgba(220,38,38,0.14);
  }
  .question-enunciado {
    min-height: 54px;
    margin: 0 0 14px;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.45;
    color: #1f2937;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .question-options {
    display: grid;
    gap: 7px;
    margin-bottom: 0;
  }
  .question-option {
    display: grid;
    grid-template-columns: 26px 1fr;
    align-items: center;
    gap: 9px;
    min-height: 42px;
    border: 1px solid #e5e7eb;
    border-radius: 13px;
    background: #fff;
    padding: 8px 11px;
    transition: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1), border-color 260ms ease, background 260ms ease, box-shadow 260ms ease;
  }
  .question-option span {
    width: 23px;
    height: 23px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 800;
    color: #2563eb;
    background: rgba(37,99,235,0.08);
  }
  .question-option p {
    min-width: 0;
    margin: 0;
    color: #475569;
    font-size: 12.5px;
    font-weight: 600;
    line-height: 1.35;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .question-option.is-selected-answer {
    border-color: rgba(37,99,235,0.42);
    background: rgba(37,99,235,0.045);
    box-shadow: 0 5px 16px rgba(37,99,235,0.08);
  }
  .question-option.is-correct-answer {
    border-color: rgba(22,163,74,0.58);
    background: rgba(22,163,74,0.075);
    box-shadow: 0 6px 18px rgba(22,163,74,0.10);
    color: #166534;
  }
  .question-option.is-wrong-answer {
    border-color: rgba(220,38,38,0.50);
    background: rgba(220,38,38,0.06);
    box-shadow: 0 6px 18px rgba(220,38,38,0.08);
    color: #991b1b;
  }
  @media (max-width: 760px) {
    .nav-cta { display: none; }
    .hero-inner {
      grid-template-columns: 1fr;
      gap: 36px;
    }
    .hero-copy {
      text-align: center;
    }
    .hero-copy p {
      margin-left: auto !important;
      margin-right: auto !important;
    }
    .hero-copy > div {
      justify-content: center !important;
    }
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
    .question-card {
      border-radius: 22px;
      padding: 18px;
      min-height: 354px;
    }
    .question-option p {
      font-size: 12px;
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
