"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[app error boundary]", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 42, fontWeight: 850, color: "#2563eb", marginBottom: 16 }}>!</div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", margin: "0 0 10px" }}>
        Algo deu errado
      </h1>
      <p style={{ fontSize: 15, color: "#6b7280", margin: "0 0 28px", maxWidth: 420, lineHeight: 1.6 }}>
        Ocorreu um erro inesperado. Tente novamente; se persistir, recarregue a página.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          type="button"
          onClick={reset}
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(135deg,#2563eb,#3b82f6)",
            padding: "10px 22px",
            borderRadius: 980,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 18px rgba(37,99,235,0.18)",
          }}
        >
          Tentar novamente
        </button>
        <Link
          href="/"
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#374151",
            background: "#fff",
            border: "1px solid rgba(226,232,240,0.95)",
            padding: "10px 22px",
            borderRadius: 980,
            textDecoration: "none",
          }}
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
