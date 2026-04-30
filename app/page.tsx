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

function GooglePlayButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="#download"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        fontSize: compact ? 14 : 16,
        fontWeight: 700,
        color: "#fff",
        background: "linear-gradient(135deg, #2563eb, #3b82f6)",
        padding: compact ? "9px 18px" : "14px 30px",
        borderRadius: 980,
        textDecoration: "none",
        boxShadow: compact ? "0 2px 12px rgba(59,130,246,0.32)" : "0 4px 24px rgba(59,130,246,0.4)",
        transition: "transform 0.2s, box-shadow 0.2s, opacity 0.2s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.04)";
        e.currentTarget.style.boxShadow = compact
          ? "0 4px 20px rgba(59,130,246,0.45)"
          : "0 6px 32px rgba(59,130,246,0.55)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = compact
          ? "0 2px 12px rgba(59,130,246,0.32)"
          : "0 4px 24px rgba(59,130,246,0.4)";
      }}
    >
      <span style={{ fontSize: compact ? 15 : 18, lineHeight: 1 }}>▶</span>
      Google Play
      <span style={{ opacity: 0.72, fontWeight: 600 }}>em breve</span>
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
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px", color: "#111827" }}>
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
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <a
            href="#como-funciona"
            style={{ fontSize: 14, color: "#6b7280", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            Como funciona
          </a>
          <a
            href="#app"
            style={{ fontSize: 14, color: "#6b7280", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            App
          </a>
          <Link
            href="/blog"
            style={{ fontSize: 14, color: "#6b7280", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            Blog
          </Link>
          <div className="nav-cta">
            <GooglePlayButton compact />
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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 92px",
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
            "radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)",
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
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#3b82f6",
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.16)",
            borderRadius: 980,
            padding: "7px 14px",
            margin: "0 0 22px",
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.1s",
          }}
        >
          App Android para estudar PMPE
        </p>

        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 82px)",
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: "-2.5px",
            margin: "0 0 24px",
            color: "#111827",
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.2s",
          }}
        >
          Estude para a PMPE.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Direto do celular.
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2.2vw, 20px)",
            color: "#6b7280",
            maxWidth: 620,
            margin: "0 auto 42px",
            lineHeight: 1.65,
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.35s",
          }}
        >
          O FixaPE e um companion de estudos focado no edital da PMPE: escolha Soldado ou Oficial,
          pratique questoes por materia e topico, acompanhe seu progresso e revise seus erros no app Android.
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
          <GooglePlayButton />
          <a
            href="#como-funciona"
            style={{
              fontSize: 16,
              fontWeight: 650,
              color: "#374151",
              background: "#fff",
              border: "1.5px solid #e5e7eb",
              padding: "13px 28px",
              borderRadius: 980,
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "border-color 0.2s, color 0.2s, transform 0.2s",
            }}
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
            Ver como funciona
          </a>
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
          Site oficial do FixaPE. App Android em preparacao para a Google Play.
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
      title: "Escolha o cargo",
      desc: "Siga um caminho de estudo para Soldado ou Oficial, com foco no que aparece no edital.",
    },
    {
      n: "02",
      title: "Selecione materia e topico",
      desc: "Encontre rapidamente o assunto certo e mantenha a pratica organizada por tema.",
    },
    {
      n: "03",
      title: "Pratique no celular",
      desc: "Resolva questoes em sessoes curtas, ideal para encaixar estudo na rotina.",
    },
    {
      n: "04",
      title: "Revise seus erros",
      desc: "Acompanhe desempenho, veja pontos fracos e volte aos topicos que precisam de reforco.",
    },
  ];

  return (
    <section id="como-funciona" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#3b82f6",
              marginBottom: 12,
            }}
          >
            Como funciona
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              color: "#111827",
              margin: "0 0 14px",
            }}
          >
            Estudo guiado pelo edital. Sem distracoes.
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", margin: 0 }}>
            O app concentra a rotina de questoes, progresso e revisao em um fluxo simples.
          </p>
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                background: "#f8faff",
                border: "1px solid #e8edf8",
                borderRadius: 20,
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
                  fontWeight: 800,
                  letterSpacing: "-3px",
                  lineHeight: 1,
                  marginBottom: 18,
                  background: "linear-gradient(135deg,rgba(59,130,246,0.25),rgba(99,102,241,0.1))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.n}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeneficiosApp() {
  const { ref, inView } = useInView();
  const benefits = [
    { title: "Organizado pelo edital", desc: "Questoes separadas por cargo, materia e topico para reduzir atrito." },
    { title: "Foco total em PMPE", desc: "Nada de plataforma generica: o produto existe para o candidato da PMPE." },
    { title: "Mobile-first", desc: "Pratica rapida no Android para estudar em qualquer intervalo do dia." },
    { title: "Caderno de erros", desc: "Volte aos pontos que voce errou e transforme falhas em revisao objetiva." },
    { title: "Progresso por topico", desc: "Veja onde esta evoluindo e quais assuntos ainda pedem reforco." },
    { title: "Rotina sem enrolacao", desc: "Abra o app, escolha o tema e resolva questoes sem distrações." },
  ];

  return (
    <section
      id="app"
      style={{
        background: "#f8faff",
        padding: "100px 24px",
        borderTop: "1px solid #e8edf8",
        borderBottom: "1px solid #e8edf8",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#3b82f6",
              marginBottom: 12,
            }}
          >
            App FixaPE
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              color: "#111827",
              margin: "0 0 14px",
            }}
          >
            O produto principal esta no Android.
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", margin: 0 }}>
            A landing page apresenta o FixaPE. A rotina de estudo acontece no app.
          </p>
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {benefits.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  benefit,
  i,
  inView,
}: {
  benefit: { title: string; desc: string };
  i: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#fff",
        border: `1.5px solid ${hovered ? "rgba(59,130,246,0.35)" : "#e5e7eb"}`,
        borderRadius: 18,
        padding: "30px 28px",
        boxShadow: hovered ? "0 8px 32px rgba(59,130,246,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: inView ? (hovered ? "translateY(-2px)" : "translateY(0)") : "translateY(30px)",
        opacity: inView ? 1 : 0,
        transition: "opacity 0.6s ease, transform 0.3s ease, border-color 0.3s, box-shadow 0.3s",
        transitionDelay: `${i * 0.06}s`,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#2563eb,#3b82f6)" }} />
      <h3 style={{ fontSize: 19, fontWeight: 800, color: "#111827", margin: "0 0 10px", letterSpacing: "-0.3px" }}>
        {benefit.title}
      </h3>
      <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{benefit.desc}</p>
    </div>
  );
}

function Cargos() {
  const { ref, inView } = useInView();
  const cargos = [
    {
      label: "Soldado PMPE",
      badge: "Em preparacao",
      href: "/soldado-pmpe",
      desc: "Trilha para candidatos a Soldado, com questoes organizadas por materias do edital e revisao por topico.",
    },
    {
      label: "Oficial PMPE",
      badge: "Planejado",
      href: "/oficial-pmpe",
      desc: "Caminho dedicado ao edital de Oficial, mantendo a mesma logica de foco, pratica e acompanhamento.",
    },
  ];

  return (
    <section style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#3b82f6",
              marginBottom: 12,
            }}
          >
            Soldado e Oficial
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              color: "#111827",
              margin: "0 0 14px",
            }}
          >
            Escolha o caminho certo para a sua prova.
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", margin: 0 }}>
            As trilhas publicas completas entram em uma proxima etapa do site.
          </p>
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {cargos.map((cargo, i) => (
            <Link
              key={cargo.label}
              href={cargo.href}
              style={{
                display: "block",
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                borderRadius: 20,
                padding: "34px 30px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                textDecoration: "none",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  fontSize: 11,
                  fontWeight: 750,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#2563eb",
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.18)",
                  borderRadius: 980,
                  padding: "5px 10px",
                  marginBottom: 18,
                }}
              >
                {cargo.badge}
              </span>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: "#111827", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
                {cargo.label}
              </h3>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: "0 0 22px" }}>{cargo.desc}</p>
              <span style={{ fontSize: 14, fontWeight: 650, color: "#2563eb" }}>Ver pagina dedicada</span>
            </Link>
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
        padding: "92px 24px",
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
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#3b82f6",
              marginBottom: 12,
            }}
          >
            Blog FixaPE
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1.2px",
              color: "#111827",
              margin: "0 0 14px",
            }}
          >
            Atualizacoes, edital e estrategia de estudo.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
            O blog continua como area publica para acompanhar novidades da PMPE, entender o edital e organizar a preparacao.
          </p>
        </div>
        <div
          style={{
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            borderRadius: 18,
            padding: "30px 28px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ fontSize: 13, color: "#9ca3af", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Conteudo publico
          </div>
          <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: "0 0 24px" }}>
            Guias, noticias e dicas para estudar com mais foco antes de abrir o app.
          </p>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              fontSize: 14,
              fontWeight: 700,
              color: "#2563eb",
              textDecoration: "none",
              border: "1.5px solid rgba(37,99,235,0.25)",
              borderRadius: 980,
              padding: "10px 20px",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(37,99,235,0.06)";
              e.currentTarget.style.borderColor = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(37,99,235,0.25)";
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
      id="download"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "136px 24px",
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
          maxWidth: 650,
          margin: "0 auto",
          position: "relative",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            color: "#111827",
            margin: "0 0 18px",
          }}
        >
          Baixe o app quando chegar a Google Play.
        </h2>
        <p style={{ fontSize: 18, color: "#6b7280", margin: "0 0 42px", lineHeight: 1.6 }}>
          O FixaPE esta sendo preparado para concentrar sua pratica, progresso e revisao de erros no Android.
        </p>
        <GooglePlayButton />
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "18px 0 0" }}>
          Link oficial sera atualizado aqui quando a pagina da loja estiver disponivel.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#fff", padding: "28px 24px", textAlign: "center", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>
          FixaPE - PMPE no Android - {new Date().getFullYear()}
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
    nav a[href="#app"] { display: none; }
  }
`;

export default function Home() {
  return (
    <>
      <style>{globalStyles}</style>
      <Navbar />
      <Hero />
      <ComoFunciona />
      <BeneficiosApp />
      <Cargos />
      <BlogSection />
      <FinalCTA />
      <Footer />
    </>
  );
}
