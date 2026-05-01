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
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderRadius: 16,
        overflow: "hidden",
        textDecoration: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ background: post.coverGradient, height: 120, flexShrink: 0, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.12)" }} />
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
        @media (max-width: 600px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ background: "#fff", minHeight: "100vh" }}>
        <div
          style={{
            background: post.coverGradient,
            height: "clamp(220px, 35vw, 380px)",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ paddingTop: 32, animation: "postFadeUp 0.4s ease both" }}>
            <Link
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
              borderBottom: "1px solid #e5e7eb",
              animation: "postFadeUp 0.5s ease both",
              animationDelay: "0.05s",
            }}
          >
            <CategoryBadge category={post.category} />
            <h1
              style={{
                fontSize: "clamp(26px, 4vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-1.2px",
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
                background: "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(59,130,246,0.04) 100%)",
                border: "1.5px solid rgba(59,130,246,0.2)",
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
                  O FixaPE esta sendo preparado para concentrar questoes gratuitas, progresso e revisao de erros no navegador.
                </div>
              </div>
              <Link
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
                  boxShadow: "0 2px 12px rgba(59,130,246,0.35)",
                  whiteSpace: "nowrap",
                }}
              >
                Comecar questoes
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
