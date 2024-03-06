/*
 * File: @mas/vite-electron-plugin/src/resolve-config.ts
 *
 * Copyright (c) 2024 Maspectra Dev Team
 */
import { mergeConfig, type InlineConfig } from "vite";

import type { ElectronOptions } from "@/options";

/** Resolve the default Vite's `InlineConfig` for build Electron-Main */
export function resolveViteConfigWithOptions(
  options: ElectronOptions
): InlineConfig {
  const defaultConfig: InlineConfig = {
    // 🚧 Avoid recursive build caused by load config file
    configFile: false,
    publicDir: false,

    build: {
      lib: options.entry
        ? {
            entry: options.entry,
            formats: options.libFormats ?? ["cjs"],
            fileName: () => "[name].js",
          }
        : undefined,
      outDir: ".dist/electron",
      // Avoid multiple entries affecting each other
      emptyOutDir: false,
    },
    resolve: {
      // #98
      // Since we're building for electron (which uses Node.js), we don't want to use the "browser" field in the packages.
      // It corrupts bundling packages like `ws` and `isomorphic-ws`, for example.
      mainFields: ["module", "jsnext:main", "jsnext"],
    },
  };

  return mergeConfig(defaultConfig, options?.vite || {});
}
