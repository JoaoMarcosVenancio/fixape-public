import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  formatDate,
  getPostBySlug,
  getRelatedPosts,
  posts,
  type Category,
  type Post,
} from "../posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

function CategoryBadge({ category }: { category: Category }) {
  const c = CATEGORY_COLORS[category];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.04em",
        color: c.text,
        background: c.bg,
        padding: "4px 10px",
        borderRadius: 980,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {CATEGORY_LABELS[category]}
    </span>
  );
}

function RelatedCard({ post }: { post: Post }) {
  const color = CATEGORY_COLORS[post.category];
  return (
    <Link
      className="related-card"
      href={`/blog/${post.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        border: "1px solid rgba(226,232,240,0.95)",
        borderRadius: 14,
        overflow: "hidden",
        textDecoration: "none",
        boxShadow: "0 2px 12px rgba(15,23,42,0.04)",
      }}
    >
      <div style={{ background: "#f8faff", borderBottom: "1px solid rgba(226,232,240,0.85)", height: 88, flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20, left: 18, width: 34, height: 4, borderRadius: 980, background: color.dot }} />
        <div style={{ position: "absolute", left: 18, right: 18, top: 40, height: 8, borderRadius: 980, background: "#e5eaf3" }} />
        <div style={{ position: "absolute", left: 18, right: 58, top: 56, height: 8, borderRadius: 980, background: "#eef2f7" }} />
      </div>
      <div style={{ padding: "16px 18px" }}>
        <CategoryBadge category={post.category} />
        <h4 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "10px 0 6px", lineHeight: 1.35 }}>
          {post.title}
        </h4>
        <span style={{ fontSize: 12, color: "#9ca3af" }}>
          {formatDate(post.date)} - {post.readingTime} min
        </span>
      </div>
    </Link>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <>
      <style>{`
        @keyframes postFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        body { background: #fff; }
        .post-back-link,
        .post-cta,
        .related-card {
          outline: none;
          transition: color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .post-back-link:hover {
          color: #111827 !important;
        }
        .post-cta:hover,
        .related-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(15,23,42,0.08) !important;
        }
        .post-back-link:focus-visible,
        .post-cta:focus-visible,
        .related-card:focus-visible {
          outline: 3px solid rgba(59,130,246,0.18);
          outline-offset: 4px;
          border-radius: 10px;
        }
        @media (max-width: 600px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ background: "#fff", minHeight: "100vh" }}>
          <div
            style={{
            background: "linear-gradient(135deg,#f8faff 0%,#ffffff 100%)",
            borderBottom: "1px solid rgba(226,232,240,0.92)",
            height: "clamp(120px, 18vw, 180px)",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", left: "50%", bottom: 32, transform: "translateX(-50%)", width: "min(520px, calc(100% - 48px))", height: 1, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.32), transparent)" }} />
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ paddingTop: 32, animation: "postFadeUp 0.4s ease both" }}>
            <Link
              className="post-back-link"
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 500,
                color: "#6b7280",
                textDecoration: "none",
              }}
            >
              ← Voltar ao Blog
            </Link>
          </div>

          <header
            style={{
              paddingTop: 24,
              paddingBottom: 32,
              borderBottom: "1px solid rgba(226,232,240,0.95)",
              animation: "postFadeUp 0.5s ease both",
              animationDelay: "0.05s",
            }}
          >
            <CategoryBadge category={post.category} />
            <h1
              style={{
                fontSize: "clamp(26px, 4vw, 44px)",
                fontWeight: 800,
                letterSpacing: 0,
                color: "#111827",
                margin: "16px 0 20px",
                lineHeight: 1.15,
              }}
            >
              {post.title}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {post.authorInitials}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{post.author}</div>
                <div style={{ fontSize: 13, color: "#9ca3af" }}>
                  {formatDate(post.date)} - {post.readingTime} min de leitura
                </div>
              </div>
            </div>
          </header>

          <article style={{ paddingTop: 36, paddingBottom: 60, animation: "postFadeUp 0.55s ease both" }}>
            {post.body.map((paragraph, i) => (
              <p key={i} style={{ fontSize: 17, lineHeight: 1.85, color: "#374151", margin: "0 0 24px" }}>
                {paragraph}
              </p>
            ))}

            <div
              style={{
                marginTop: 48,
                background: "#f8faff",
                border: "1px solid rgba(226,232,240,0.95)",
                borderRadius: 16,
                padding: "28px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                  Estude PMPE Soldado na web
                </div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>
                  O PasseiPMPE está sendo preparado para concentrar questões gratuitas, progresso e revisão de erros no navegador.
                </div>
              </div>
              <Link
                className="post-cta"
                href="/questoes"
                style={{
                  flexShrink: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  padding: "11px 24px",
                  borderRadius: 980,
                  textDecoration: "none",
                  boxShadow: "0 8px 18px rgba(37,99,235,0.18)",
                  whiteSpace: "nowrap",
                }}
              >
                Começar questões
              </Link>
            </div>
          </article>
        </div>

        {related.length > 0 && (
          <section style={{ background: "#f8faff", borderTop: "1px solid #e8edf8", padding: "60px 24px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#9ca3af",
                  marginBottom: 20,
                }}
              >
                Artigos relacionados
              </p>
              <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {related.map((p) => (
                  <RelatedCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
