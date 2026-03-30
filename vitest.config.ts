import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    exclude: [
      "node_modules/**",
      "packages/**",
      "dd/**",
      "dd-navigator/**",
      "accountingfirm/**",
      "corporate-os/**",
      "inbox/**",
      "mtg/**",
      ".next/**",
      "dist/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "packages/**",
        "dd/**",
        "dd-navigator/**",
        "accountingfirm/**",
        "corporate-os/**",
        "inbox/**",
        "mtg/**",
        ".next/**",
        "**/*.config.ts",
        "**/*.d.ts",
        "**/__tests__/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
