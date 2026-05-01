# FixaPE Site

Static web-first website for FixaPE, focused on PMPE Soldado question practice.

## Scope

- Static public website for PMPE Soldado
- Static blog powered by `app/blog/posts.ts`
- Static informational pages for Soldado, privacy, and terms
- No login, API routes, SQLite database, payment, or backend features
- Question practice will be added in later static-first phases

## Commands

```bash
npm run dev
npm run typecheck
npm test
npm run build
```

`next.config.ts` uses static export mode so the site can move toward GitHub Pages or another static host.
