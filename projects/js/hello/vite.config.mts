/// <reference types="vitest" />
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath, URL } from "node:url";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

export default defineConfig(({ command }): UserConfig => {
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

  const isProduction =
    process.env.NODE_ENV === "production" &&
    !(process.env.BAZEL_COMPILATION_MODE === "dbg");

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
      {
        ...visualizer({ open: false, filename: "./.dist/bundle.html" }),
        apply: "build",
      },
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      minify: isProduction ? "esbuild" : false,
      sourcemap: !isProduction,
      outDir: ".dist/lib",
      lib: {
        entry: {
          index: "./src/index.ts",
        },
        formats: ["cjs" as const, "es" as const],
        fileName: (format) => (format === "es" ? "[name].mjs" : "[name].js"),
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
