/// <reference types="vitest" />

import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

import pkg from "./package.json";

export default defineConfig((): UserConfig => {
  return {
    plugins: [
      tsconfigPaths(),
      {
        ...dts({
          outDir: ".dist/types",
          exclude: ["**/tests"],
          include: ["src"],
        }),
        apply: "build",
      },
      {
        ...visualizer({ open: false, filename: "./.build/stat.html" }),
        apply: "build",
      },
    ],
    build: {
      outDir: ".dist/lib",
      lib: {
        entry: {
          index: "./src/index.ts",
        },
        formats: ["es" as const],
        fileName: (_, entryName) => `${entryName}.js`,
      },

      rollupOptions: {
        external: [...Object.keys(pkg.dependencies || {}), /^node:/],
      },
      chunkSizeWarningLimit: 1000,
    },
    test: {
      /* for example, use global to avoid globals imports (describe, test, expect): */
      globals: true,
      coverage: {
        provider: "istanbul" as const,
        reporter: ["lcov" as const, "html" as const, "text-summary" as const],
      },
      reporters: ["verbose" as const],
    },
  };
});
