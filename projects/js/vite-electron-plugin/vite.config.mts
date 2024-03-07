/// <reference types="vitest" />

import { fileURLToPath, URL } from "node:url";
import { rmSync } from "node:fs";
import { defineConfig } from "vite";

import dts from "vite-plugin-dts";
import pkg from "./package.json";
export default defineConfig(({ command }) => {
  if (command === "build") {
    rmSync(".dist/", { recursive: true, force: true });
  }

  return {
    plugins: [
      {
        ...dts({
          outDir: ".dist/types",
          exclude: ["**/tests"],
          include: ["src"],
          root: __dirname,
        }),
        apply: "build",
      },
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      minify: process.env.MINIFY_JS === "1" ?? false,
      outDir: ".dist/lib",
      lib: {
        entry: "./src/index.ts",
        formats: ["cjs" as const, "es" as const],
        fileName: (format) => (format === "es" ? "[name].mjs" : "[name].js"),
      },
      rollupOptions: {
        external: [
          ...Object.keys(pkg.dependencies || {}),
          "electron",
          /^node:/,
        ],
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
