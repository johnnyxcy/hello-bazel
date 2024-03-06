/*
 * File: @mas/vite-electron-plugin/src/electron-env.d.ts
 *
 * Copyright (c) 2023 - 2024 Maspectra Dev Team
 */
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "test" | "production";
        readonly VITE_DEV_SERVER_URL: string;
    }

    interface Process {
        electronApp: import("node:child_process").ChildProcess;
    }
}

interface ImportMeta {
    /** shims Vite */
    env: Record<string, any>;
}
