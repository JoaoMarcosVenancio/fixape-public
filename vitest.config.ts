import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    globals: true,
    environment: "node",
    include: ["tests/unit/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["app/blog/posts.ts", "lib/questions/**/*.ts"],
      exclude: [
        "**/*.test.ts",
        "tests/**",
        "scripts/**",
        "**/node_modules/**",
        "**/.next/**",
      ],
    },
  },
});
