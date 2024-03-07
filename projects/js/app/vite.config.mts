import fs from "node:fs";
import path from "node:path";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import chalk from "chalk";

import { electron, notBundle } from "@hello-bazel/vite-electron-plugin";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ command }): UserConfig => {
  const isServe = command === "serve";
  const isBuild = command === "build";

  if (isBuild) {
    console.info(
      `Cleaning up the .dist/ directory before ${chalk.green("build")}...`
    );
    if (fs.existsSync(".dist")) {
      // remove every content in the directory
      fs.readdirSync(".dist").forEach((file) => {
        const joined = path.join(".dist", file);
        if (fs.lstatSync(joined).isDirectory()) {
          fs.rmdirSync(joined, { recursive: true });
        } else {
          fs.unlinkSync(joined);
        }
      });
    }
  }

  const isVscodeDebug = !!process.env._VSCODE_DEBUG;
  const sourcemap = isServe || isVscodeDebug;

  return {
    plugins: [
      electron([
        // #region Main Process
        {
          // Main-Process entry file of the Electron App.
          entry: "src/platform/main.ts",
          libFormats: [pkg.type === "module" ? "es" : "cjs"],
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: ".dist/main",
              rollupOptions: {
                external: [...Object.keys(pkg.dependencies || {}), /^node:/],
              },
              watch: {
                include: ["node_modules/@hello-bazel/**"],
              },
            },
            plugins: [isServe && notBundle()],
          },

          onstart(options) {
            console.info(
              `${chalk.dim(
                "[Electron:Main]"
              )} Starting Application ${chalk.bold(
                chalk.yellow(pkg.name)
              )}@${chalk.yellow(pkg.version)}`
            );
            if (isVscodeDebug) {
              if (!process.env._REMOTE_DEBUGGING_PORT) {
                throw new Error(
                  "Missing environment variable `_REMOTE_DEBUGGING_PORT` with vscode debugging."
                );
              }
              options.startup([
                `--remote-debugging-port=${process.env._REMOTE_DEBUGGING_PORT}`,
                ".",
              ]);
            } else {
              options.startup();
            }
          },
        },
        // #endregion

        // #region Preload Process
        {
          // Preload entry file of the Electron App.
          entry: "src/platform/preload.ts",
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : undefined, // #332
              minify: isBuild,
              outDir: ".dist/main",
              rollupOptions: {
                external: [...Object.keys(pkg.dependencies || {}), /^node:/],
              },
            },
          },
          onstart(options) {
            console.info(
              `${chalk.dim(
                "[Electron:Preload]"
              )} Notify the Renderer-Process to reload`
            );
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
            // instead of restarting the entire Electron App.
            options.reload();
          },
        },
        // #endregion
      ]),
      react(),
    ],
    // #region Renderer Process
    build: {
      sourcemap,
      minify: isBuild,
      watch: {
        include: ["node_modules/@hello-bazel/**"],
      },
      rollupOptions: {
        input: {
          workbench: path.resolve(__dirname, "src/workbench/index.html"),
          launcher: path.resolve(__dirname, "src/launcher/index.html"),
        },
        plugins: [
          {
            name: "bundle-html-rename",
            generateBundle(options, bundle) {
              function renameHtml(name: string): void {
                const html = bundle[`src/${name}/index.html`];
                if (html.type === "asset" && typeof html.source === "string") {
                  html.fileName = `${name}.html`;
                  html.source = html.source.replace(
                    /\.\.\/\.\.\/chunks/g,
                    "./chunks"
                  );
                }
              }
              renameHtml("workbench");
              renameHtml("launcher");
            },
          },
        ],
      },
      outDir: "./.dist/renderer",
      assetsDir: "chunks",
    },
    // #endregion
    server: isVscodeDebug
      ? (() => {
          //   const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
          const url = new URL("http://127.0.0.1:7777");
          return {
            host: url.hostname,
            port: +url.port,
          };
        })()
      : undefined,
    clearScreen: false,
  };
});
