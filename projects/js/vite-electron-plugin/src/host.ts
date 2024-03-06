/*
 * File: @mas/vite-electron-plugin/src/host.ts
 *
 * Copyright (c) 2023 - 2024 Maspectra Dev Team
 */
/**
 * @see https://github.com/vitejs/vite/blob/v4.0.1/packages/vite/src/node/constants.ts#L137-L147
 */
export function resolveHostname(hostname: string) {
    const loopbackHosts = new Set(["localhost", "127.0.0.1", "::1", "0000:0000:0000:0000:0000:0000:0000:0001"]);
    const wildcardHosts = new Set(["0.0.0.0", "::", "0000:0000:0000:0000:0000:0000:0000:0000"]);

    return loopbackHosts.has(hostname) || wildcardHosts.has(hostname) ? "localhost" : hostname;
}
