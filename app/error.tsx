"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[app error boundary]", error);
  }, [error]);

  return (
    <div style={{
      minHeight: "100vh", background: "#fff",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "32px 24px", textAlign: "center",
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", margin: "0 0 10px" }}>
        Algo deu errado
      </h1>
      <p style={{ fontSize: 15, color: "#6b7280", margin: "0 0 28px", maxWidth: 420, lineHeight: 1.6 }}>
        Ocorreu um erro inesperado. Tente novamente — se persistir, recarregue a página.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={reset} style={{
          fontSize: 14, fontWeight: 600, color: "#fff",
          background: "linear-gradient(135deg,#2563eb,#3b82f6)",
          padding: "10px 22px", borderRadius: 980, border: "none",
          cursor: "pointer", boxShadow: "0 2px 12px rgba(59,130,246,0.35)",
        }}>
          Tentar novamente
        </button>
        <Link href="/" style={{
          fontSize: 14, fontWeight: 600, color: "#374151",
          background: "#fff", border: "1.5px solid #e5e7eb",
          padding: "10px 22px", borderRadius: 980, textDecoration: "none",
        }}>
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
