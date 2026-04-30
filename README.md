# FixaPE Site

Static marketing website for FixaPE, an Android-first PMPE study companion.

## Scope

- Landing page for the Android app
- Static blog powered by `app/blog/posts.ts`
- Static informational pages for Soldado, Oficial, privacy, and terms
- No website login, API routes, SQLite database, progress dashboard, or web study platform

The operational product lives in the Android app and backend API.

## Commands

```bash
npm run dev
npm run typecheck
npm test
npm run build
```

`next.config.ts` uses static export mode so the site can move toward GitHub Pages or another static host.

