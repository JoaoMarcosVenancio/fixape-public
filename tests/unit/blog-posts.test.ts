import { describe, it, expect } from "vitest";
import {
  posts,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/app/blog/posts";

describe("app/blog/posts — data integrity", () => {
  it("todos os posts devem ter slugs únicos", () => {
    const slugs = posts.map((p) => p.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(posts.length);
  });

  it("todos os posts devem ter os campos obrigatórios preenchidos", () => {
    for (const p of posts) {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.summary).toBeTruthy();
      expect(p.author).toBeTruthy();
      expect(p.authorInitials).toMatch(/^[A-Z]{1,3}$/);
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.readingTime).toBeGreaterThan(0);
      expect(p.body.length).toBeGreaterThan(0);
    }
  });

  it("deve ter exatamente um post marcado como featured", () => {
    const featured = posts.filter((p) => p.featured);
    expect(featured.length).toBe(1);
  });

  it("todas as categorias usadas devem ter label e cor definidas", () => {
    for (const p of posts) {
      expect(CATEGORY_LABELS[p.category]).toBeTruthy();
      expect(CATEGORY_COLORS[p.category]).toBeTruthy();
      expect(CATEGORY_COLORS[p.category].bg).toBeTruthy();
    }
  });
});

describe("app/blog/posts — getPostBySlug", () => {
  it("deve retornar o post quando o slug existe", () => {
    const first = posts[0];
    const found = getPostBySlug(first.slug);
    expect(found).toBeDefined();
    expect(found?.slug).toBe(first.slug);
  });

  it("deve retornar undefined para slug inexistente", () => {
    expect(getPostBySlug("slug-que-nao-existe")).toBeUndefined();
  });
});

describe("app/blog/posts — getRelatedPosts", () => {
  it("deve retornar posts diferentes do atual", () => {
    const current = posts[0];
    const related = getRelatedPosts(current);
    expect(related.every((p) => p.slug !== current.slug)).toBe(true);
  });

  it("deve retornar até o número solicitado", () => {
    const current = posts[0];
    const related = getRelatedPosts(current, 2);
    expect(related.length).toBeLessThanOrEqual(2);
  });

  it("deve priorizar posts da mesma categoria", () => {
    const current = posts[0];
    const related = getRelatedPosts(current, posts.length - 1);
    const sameCategoryCount = posts.filter(
      (p) => p.slug !== current.slug && p.category === current.category
    ).length;
    if (sameCategoryCount > 0) {
      // os primeiros da lista devem ser da mesma categoria
      expect(related[0].category).toBe(current.category);
    }
  });
});

describe("app/blog/posts — formatDate", () => {
  it("deve formatar uma data ISO como pt-BR", () => {
    const formatted = formatDate("2025-03-15");
    expect(formatted).toContain("março");
    expect(formatted).toContain("2025");
    expect(formatted).toContain("15");
  });

  it("deve preservar o dia correto sem problema de fuso", () => {
    const formatted = formatDate("2025-01-01");
    expect(formatted).toContain("01");
    expect(formatted).toContain("2025");
  });
});
