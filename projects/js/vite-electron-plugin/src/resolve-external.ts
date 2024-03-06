/*
 * File: @mas/vite-electron-plugin/src/resolve-external.ts
 *
 * Copyright (c) 2023 - 2024 Maspectra Dev Team
 */
import { builtinModules } from "node:module";
import type vite from "vite";

export function resolveBuiltinAsExternal(config: vite.InlineConfig): vite.InlineConfig {
    const builtins = builtinModules.filter((e) => !e.startsWith("_"));
    builtins.push("electron", ...builtins.map((m) => `node:${m}`));

    config.build ??= {};
    config.build.rollupOptions ??= {};

    let external = config.build.rollupOptions.external;
    if (Array.isArray(external) || typeof external === "string" || external instanceof RegExp) {
        external = builtins.concat(external as string[]);
    } else if (typeof external === "function") {
        const original = external;
        external = function (source, importer, isResolved) {
            if (builtins.includes(source)) {
                return true;
            }
            return original(source, importer, isResolved);
        };
    } else {
        external = builtins;
    }
    config.build.rollupOptions.external = external;

    return config;
}
