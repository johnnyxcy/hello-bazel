/*
 * File: @mas/vite-electron-plugin/src/options.ts
 *
 * Copyright (c) 2023 - 2024 Maspectra Dev Team
 */

import type { InlineConfig, LibraryOptions, LibraryFormats } from "vite";

export interface ElectronOptions {
    /**
     * Shortcut of `build.lib.entry`
     */
    entry?: LibraryOptions["entry"];
    vite?: InlineConfig;
    libFormats?: LibraryFormats[];
    /**
     * Triggered when Vite is built every time -- `vite serve` command only.
     *
     * If this `onstart` is passed, Electron App will not start automatically.
     * However, you can start Electroo App via `startup` function.
     */
    onstart?: (args: {
        /**
         * Electron App startup function.
         * It will mount the Electron App child-process to `process.electronApp`.
         * @param argv default value `['.', '--no-sandbox']`
         */
        startup: (argv?: string[]) => Promise<void>;
        /** Reload Electron-Renderer */
        reload: () => void;
    }) => void | Promise<void>;
}
