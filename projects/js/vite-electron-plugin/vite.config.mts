/// <reference types="vitest" />
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import dts from "vite-plugin-dts";
import pkg from "./package.json";
export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  if (isBuild) {
    console.info(
      `Cleaning up the .dist/ directory before ${chalk.green("build")}...`,
    );
    if (fs.existsSync(".dist")) {
      // remove every content in the directory
      fs.readdirSync(".dist").forEach((file) => {
        const joined = path.join(".dist", file);
        if (fs.lstatSync(joined).isDirectory()) {
          fs.rmSync(joined, { recursive: true });
        } else {
          fs.unlinkSync(joined);
        }
      });
    }
  }
  return {
    plugins: [
      {
        ...dts({
          outDir: ".dist/types",
          exclude: ["**/tests", "**/*.test.*", "**/*.spec.*"],
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
      minify: false,
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
