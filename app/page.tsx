"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

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

const secondaryButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  fontWeight: 700,
  color: "#374151",
  background: "#fff",
  border: "1.5px solid #e5e7eb",
  padding: "13px 28px",
  borderRadius: 980,
  textDecoration: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  transition: "border-color 0.2s, color 0.2s, transform 0.2s",
  whiteSpace: "nowrap",
};

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
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

function SecondaryAnchor({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={secondaryButtonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#9ca3af";
        e.currentTarget.style.color = "#111827";
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e5e7eb";
        e.currentTarget.style.color = "#374151";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </a>
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
          <a href="#como-funciona" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
            Como funciona
          </a>
          <a href="#materias" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
            Materias
          </a>
          <Link href="/blog" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
            Blog
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
              Comecar questoes
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
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 88px",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 1000,
          height: 700,
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.16) 0%, rgba(34,197,94,0.06) 42%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
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
        <p
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            fontWeight: 750,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#2563eb",
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.16)",
            borderRadius: 980,
            padding: "7px 14px",
            margin: "0 0 22px",
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.1s",
          }}
        >
          Plataforma web gratuita para PMPE Soldado
        </p>

        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 82px)",
            fontWeight: 850,
            lineHeight: 1.06,
            letterSpacing: "-2.5px",
            margin: "0 0 24px",
            color: "#111827",
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.2s",
          }}
        >
          Pratique questoes para{" "}
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
            animationDelay: "0.35s",
          }}
        >
          O FixaPE esta sendo preparado como um site estatico para estudar PMPE Soldado com questoes gratuitas,
          materias do edital, revisao de erros e progresso salvo no proprio navegador.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.5s",
          }}
        >
          <PrimaryLink href="/questoes">Comecar questoes</PrimaryLink>
          <SecondaryAnchor href="#materias">Ver materias</SecondaryAnchor>
          <SecondaryAnchor href="#revisao">Revisar erros</SecondaryAnchor>
        </div>

        <p
          style={{
            fontSize: 13,
            color: "#9ca3af",
            margin: "20px 0 0",
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.62s",
          }}
        >
          MVP web-first: sem login, sem pagamento e sem backend nesta etapa.
        </p>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const { ref, inView } = useInView();
  const steps = [
    {
      n: "01",
      title: "Abra a trilha de Soldado",
      desc: "O fluxo principal sera dedicado somente ao edital de PMPE Soldado.",
    },
    {
      n: "02",
      title: "Escolha materia e topico",
      desc: "A organizacao sera feita por assunto para reduzir atrito na hora de praticar.",
    },
    {
      n: "03",
      title: "Pratique questoes gratuitas",
      desc: "As sessoes de estudo serao curtas, diretas e pensadas para funcionar no navegador.",
    },
    {
      n: "04",
      title: "Revise erros e favoritas",
      desc: "O progresso local vai ajudar a voltar aos pontos fracos sem exigir cadastro.",
    },
  ];

  return (
    <section id="como-funciona" style={{ background: "#fff", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 13, fontWeight: 750, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: 12 }}>
            Como funciona
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 850, letterSpacing: "-1.5px", color: "#111827", margin: "0 0 14px" }}>
            Um caminho simples para praticar PMPE Soldado.
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", margin: 0 }}>
            A primeira versao sera estatica, gratuita e focada no essencial para resolver questoes.
          </p>
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                background: "#f8faff",
                border: "1px solid #e8edf8",
                borderRadius: 18,
                padding: "34px 26px",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 850,
                  letterSpacing: "-3px",
                  lineHeight: 1,
                  marginBottom: 18,
                  background: "linear-gradient(135deg,rgba(37,99,235,0.25),rgba(22,163,74,0.1))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.n}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 750, color: "#111827", margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Materias() {
  const { ref, inView } = useInView();
  const materias = [
    "Lingua Portuguesa",
    "Historia de Pernambuco",
    "Raciocinio Logico",
    "Informatica",
    "Direito Constitucional",
    "Direitos Humanos e Legislacao",
  ];

  return (
    <section
      id="materias"
      style={{
        background: "#f8faff",
        padding: "96px 24px",
        borderTop: "1px solid #e8edf8",
        borderBottom: "1px solid #e8edf8",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 13, fontWeight: 750, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: 12 }}>
            Materias
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 850, letterSpacing: "-1.5px", color: "#111827", margin: "0 0 14px" }}>
            Conteudo organizado pelo edital de Soldado.
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", margin: 0 }}>
            A base de questoes entra na proxima fase. Nesta etapa, o site ja passa a comunicar o foco correto.
          </p>
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {materias.map((materia, i) => (
            <div
              key={materia}
              style={{
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                borderRadius: 16,
                padding: "22px 24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 750, color: "#111827" }}>{materia}</div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 6 }}>Questoes por topico em breve</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Revisao() {
  const features = [
    { title: "Erros", desc: "Revisite o que voce errou para transformar falhas em estudo direcionado." },
    { title: "Favoritas", desc: "Separe questoes importantes para voltar nelas antes da prova." },
    { title: "Progresso local", desc: "Acompanhe respondidas, acertos e evolucao por materia no navegador." },
  ];

  return (
    <section id="revisao" style={{ background: "#fff", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 13, fontWeight: 750, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: 12 }}>
            Revisao
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 850, letterSpacing: "-1.5px", color: "#111827", margin: "0 0 14px" }}>
            Praticar agora, revisar com contexto depois.
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", margin: 0 }}>
            A experiencia de questoes ainda nao foi implementada, mas o MVP sera desenhado para progresso local.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          {features.map((feature) => (
            <div key={feature.title} style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: "28px 26px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontSize: 19, fontWeight: 800, color: "#111827", margin: "0 0 10px" }}>{feature.title}</h3>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section
      style={{
        background: "#f8faff",
        padding: "88px 24px",
        borderTop: "1px solid #e8edf8",
        borderBottom: "1px solid #e8edf8",
      }}
    >
      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(260px, 0.8fr)",
          gap: 28,
          alignItems: "center",
        }}
        className="blog-band"
      >
        <div>
          <p style={{ fontSize: 13, fontWeight: 750, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: 12 }}>
            Blog FixaPE
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 850, letterSpacing: "-1.2px", color: "#111827", margin: "0 0 14px" }}>
            Edital, estrategia e preparacao para PMPE.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
            O blog continua como area publica para acompanhar conteudos de estudo enquanto a pratica de questoes evolui.
          </p>
        </div>
        <div
          style={{
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            borderRadius: 16,
            padding: "30px 28px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ fontSize: 13, color: "#9ca3af", fontWeight: 750, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Conteudo publico
          </div>
          <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: "0 0 24px" }}>
            Guias, noticias e dicas para estudar PMPE Soldado com mais foco.
          </p>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              fontSize: 14,
              fontWeight: 750,
              color: "#2563eb",
              textDecoration: "none",
              border: "1.5px solid rgba(37,99,235,0.25)",
              borderRadius: 980,
              padding: "10px 20px",
            }}
          >
            Acessar blog
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { ref, inView } = useInView();

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "120px 24px",
        textAlign: "center",
        background: "#fff",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 800,
          height: 500,
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        ref={ref}
        style={{
          maxWidth: 680,
          margin: "0 auto",
          position: "relative",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <h2 style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 850, letterSpacing: "-2px", color: "#111827", margin: "0 0 18px" }}>
          Comece pela trilha de Soldado PMPE.
        </h2>
        <p style={{ fontSize: 18, color: "#6b7280", margin: "0 0 42px", lineHeight: 1.6 }}>
          Nesta fase, o botao leva para a pagina informativa da trilha. O fluxo real de questoes sera implementado na proxima etapa.
        </p>
        <PrimaryLink href="/questoes">Comecar questoes</PrimaryLink>
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
    .blog-band { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 560px) {
    nav a[href="#materias"] { display: none; }
  }
`;

export default function Home() {
  return (
    <>
      <style>{globalStyles}</style>
      <Navbar />
      <Hero />
      <ComoFunciona />
      <Materias />
      <Revisao />
      <BlogSection />
      <FinalCTA />
      <Footer />
    </>
  );
}
