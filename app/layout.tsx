import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FixaPE - Estude para PMPE no Android",
  description: "Landing page oficial do FixaPE, companion de estudos para candidatos da PMPE no Android.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body style={{
        margin: 0, padding: 0,
        background: "#ffffff",
        color: "#111827",
        fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}>
        {children}
      </body>
    </html>
  );
}
