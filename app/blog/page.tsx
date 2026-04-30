"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { posts, CATEGORY_LABELS, CATEGORY_COLORS, formatDate, type Category, type Post } from "./posts";

/* ─── Scroll animation hook ─────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Category badge ─────────────────────────────────────────────── */
function CategoryBadge({ category }: { category: Category }) {
  const c = CATEGORY_COLORS[category];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 12, fontWeight: 700, letterSpacing: "0.04em",
      color: c.text, background: c.bg,
      padding: "4px 10px", borderRadius: 980,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {CATEGORY_LABELS[category]}
    </span>
  );
}

/* ─── Featured post ──────────────────────────────────────────────── */
function FeaturedPost({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        background: "#fff",
        border: `1.5px solid ${hovered ? "rgba(59,130,246,0.35)" : "#e5e7eb"}`,
        borderRadius: 20,
        overflow: "hidden",
        textDecoration: "none",
        boxShadow: hovered ? "0 8px 40px rgba(59,130,246,0.12)" : "0 2px 12px rgba(0,0,0,0.04)",
        transition: "border-color 0.25s, box-shadow 0.25s",
        animation: "blogFadeUp 0.6s ease both",
        animationDelay: "0.1s",
      }}
    >
      {/* Cover */}
      <div style={{
        background: post.coverGradient,
        minHeight: 320,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.18)",
          transition: "background 0.25s",
        }} />
        <div style={{
          position: "absolute", bottom: 20, left: 20,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.8)",
        }}>
          Destaque
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <CategoryBadge category={post.category} />
        <h2 style={{
          fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 800, letterSpacing: "-0.5px",
          color: hovered ? "#1d4ed8" : "#111827",
          margin: "14px 0 12px", lineHeight: 1.25,
          transition: "color 0.2s",
        }}>
          {post.title}
        </h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: "0 0 24px" }}>
          {post.summary}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg,#2563eb,#3b82f6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0,
          }}>
            {post.authorInitials}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{post.author}</div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>
              {formatDate(post.date)} · {post.readingTime} min de leitura
            </div>
          </div>
        </div>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 14, fontWeight: 600,
          color: hovered ? "#1d4ed8" : "#2563eb",
          transition: "color 0.2s",
        }}>
          Ler artigo completo →
        </span>
      </div>
    </Link>
  );
}

/* ─── Post card ──────────────────────────────────────────────────── */
function PostCard({ post, index }: { post: Post; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column",
        background: "#fff",
        border: `1.5px solid ${hovered ? "rgba(59,130,246,0.35)" : "#e5e7eb"}`,
        borderRadius: 16,
        overflow: "hidden",
        textDecoration: "none",
        boxShadow: hovered ? "0 8px 32px rgba(59,130,246,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
        animation: `blogFadeUp 0.5s ease both`,
        animationDelay: `${0.05 * index}s`,
      }}
    >
      {/* Cover */}
      <div style={{
        background: post.coverGradient,
        height: 160,
        flexShrink: 0,
        position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.12)" }} />
      </div>

      {/* Body */}
      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
        <CategoryBadge category={post.category} />

        <h3 style={{
          fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px",
          color: hovered ? "#1d4ed8" : "#111827",
          margin: "10px 0 8px", lineHeight: 1.35,
          transition: "color 0.2s",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {post.title}
        </h3>

        <p style={{
          fontSize: 14, color: "#6b7280", lineHeight: 1.65,
          margin: "0 0 auto", paddingBottom: 16,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {post.summary}
        </p>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 16, borderTop: "1px solid #f3f4f6", marginTop: "auto",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 26, height: 26, borderRadius: "50%",
              background: "linear-gradient(135deg,#2563eb,#3b82f6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0,
            }}>
              {post.authorInitials}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{post.author}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{formatDate(post.date)}</div>
            </div>
          </div>
          <span style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }}>
            {post.readingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main page ──────────────────────────────────────────────────── */
const ALL_CATEGORIES: (Category | "all")[] = ["all", "noticias", "dicas", "edital", "concurso"];
const FILTER_LABELS: Record<string, string> = {
  all: "Todos",
  noticias: "Notícias",
  dicas: "Dicas de Estudo",
  edital: "Edital & Legislação",
  concurso: "Concurso & Vagas",
};
const PAGE_SIZE = 6;

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const gridRef = useInView(0.05);

  const featured = posts.find((p) => p.featured) ?? posts[0];

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      search.trim() === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const nonFeaturedFiltered = filtered.filter((p) => !p.featured || activeCategory !== "all" || search.trim() !== "");
  const visiblePosts = nonFeaturedFiltered.slice(0, visibleCount);
  const hasMore = visibleCount < nonFeaturedFiltered.length;

  function handleCategoryChange(cat: Category | "all") {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  }

  function handleSearchChange(val: string) {
    setSearch(val);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <>
      <style>{`
        @keyframes blogFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        body { background: #fff; }
        .blog-search:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
        @media (max-width: 700px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          .featured-cover { min-height: 200px !important; }
        }
        @media (max-width: 900px) {
          .posts-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .posts-grid { grid-template-columns: 1fr !important; }
          .filter-bar { flex-wrap: wrap; }
        }
      `}</style>

      <div style={{ background: "#fff", minHeight: "100vh" }}>

        {/* ── Hero ── */}
        <section style={{
          position: "relative", overflow: "hidden",
          background: "#fff",
          padding: "80px 24px 64px",
          borderBottom: "1px solid #e8edf8",
        }}>
          <div style={{
            position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
            width: 900, height: 500,
            background: "radial-gradient(ellipse at 50% 10%, rgba(59,130,246,0.14) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
          <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <p style={{
              fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "#3b82f6", marginBottom: 14,
              animation: "blogFadeUp 0.5s ease both", animationDelay: "0.05s",
            }}>
              Blog FixaPE
            </p>
            <h1 style={{
              fontSize: "clamp(34px, 6vw, 60px)", fontWeight: 800,
              letterSpacing: "-2px", color: "#111827",
              margin: "0 0 16px", lineHeight: 1.1,
              animation: "blogFadeUp 0.55s ease both", animationDelay: "0.12s",
            }}>
              Fique por{" "}
              <span style={{
                background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                dentro
              </span>
            </h1>
            <p style={{
              fontSize: 18, color: "#6b7280", margin: "0 auto 40px",
              maxWidth: 520, lineHeight: 1.65,
              animation: "blogFadeUp 0.55s ease both", animationDelay: "0.2s",
            }}>
              Notícias, dicas e atualizações sobre o concurso da PMPE.
            </p>

            {/* Search */}
            <div style={{
              position: "relative", maxWidth: 480, margin: "0 auto",
              animation: "blogFadeUp 0.55s ease both", animationDelay: "0.28s",
            }}>
              <span style={{
                position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                fontSize: 16, color: "#9ca3af", pointerEvents: "none",
              }}>
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Pesquisar artigos..."
                className="blog-search"
                style={{
                  width: "100%", padding: "13px 16px 13px 44px",
                  fontSize: 15, color: "#111827",
                  background: "#fff",
                  border: "1.5px solid #e5e7eb", borderRadius: 12,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              />
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

          {/* ── Featured post ── */}
          {activeCategory === "all" && search.trim() === "" && (
            <section style={{ padding: "56px 0 0" }}>
              <p style={{
                fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "#9ca3af", marginBottom: 20,
              }}>
                Destaque
              </p>
              <div className="featured-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <FeaturedPost post={featured} />
              </div>
            </section>
          )}

          {/* ── Category filter ── */}
          <section style={{ padding: "48px 0 0" }}>
            <div className="filter-bar" style={{
              display: "flex", alignItems: "center", gap: 8,
              overflowX: "auto", paddingBottom: 4,
            }}>
              {ALL_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const color = cat !== "all" ? CATEGORY_COLORS[cat as Category] : null;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    style={{
                      flexShrink: 0,
                      fontSize: 13, fontWeight: isActive ? 700 : 500,
                      color: isActive ? (color ? color.text : "#2563eb") : "#6b7280",
                      background: isActive ? (color ? color.bg : "rgba(37,99,235,0.1)") : "transparent",
                      border: `1.5px solid ${isActive ? (color ? color.dot + "55" : "rgba(37,99,235,0.35)") : "#e5e7eb"}`,
                      padding: "7px 16px", borderRadius: 980,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = "#9ca3af"; e.currentTarget.style.color = "#111827"; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#6b7280"; } }}
                  >
                    {FILTER_LABELS[cat]}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Posts grid ── */}
          <section style={{ padding: "32px 0 80px" }}>
            {visiblePosts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>📭</div>
                <p style={{ fontSize: 16, margin: 0 }}>Nenhum artigo encontrado para essa busca.</p>
              </div>
            ) : (
              <>
                <div ref={gridRef.ref}>
                  <div
                    className="posts-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 24,
                      opacity: gridRef.inView ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                  >
                    {visiblePosts.map((post, i) => (
                      <PostCard key={post.slug} post={post} index={i} />
                    ))}
                  </div>
                </div>

                {/* Load more */}
                {hasMore && (
                  <div style={{ textAlign: "center", marginTop: 48 }}>
                    <button
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                      style={{
                        fontSize: 15, fontWeight: 600, color: "#2563eb",
                        background: "transparent",
                        border: "1.5px solid rgba(37,99,235,0.35)",
                        padding: "13px 32px", borderRadius: 980,
                        cursor: "pointer",
                        transition: "background 0.2s, border-color 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,99,235,0.06)"; e.currentTarget.style.borderColor = "#2563eb"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.35)"; }}
                    >
                      Carregar mais posts
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
