/// <reference types="vitest" />

import { fileURLToPath, URL } from "node:url";
import { rmSync } from "node:fs";
import { defineConfig } from "vite";

import dts from "vite-plugin-dts";

export default defineConfig(({ command }) => {
  if (command === "build") {
    rmSync(".dist/", { recursive: true, force: true });
  }

  return {
    plugins: [dts({ outDir: ".dist/types" })],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: ".dist/lib",
      lib: {
        entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
        formats: ["cjs" as const],
      },
      rollupOptions: {
        external: ["vite", /^electron/, /^node:/],
      },
    },
    test: {
      /* for example, use global to avoid globals imports (describe, test, expect): */
      globals: true,
      coverage: {
        provider: "istanbul" as const,
      },
    },
  };
});
