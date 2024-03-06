/*
 * File: @mas/vite-electron-plugin/src/server.ts
 *
 * Copyright (c) 2023 - 2024 Maspectra Dev Team
 */
import type { AddressInfo } from "node:net";
import type { ViteDevServer } from "vite";

import { resolveHostname } from "@/host";

export function resolveServerUrl(server: ViteDevServer): string | void {
  const addressInfo = server.httpServer!.address();
  const isAddressInfo = (x: any): x is AddressInfo => x?.address;

  if (isAddressInfo(addressInfo)) {
    const { address, port } = addressInfo;
    const hostname = resolveHostname(address);

    const options = server.config.server;
    const protocol = options.https ? "https" : "http";
    const devBase = server.config.base;

    const path = typeof options.open === "string" ? options.open : devBase;
    const url = path.startsWith("http")
      ? path
      : `${protocol}://${hostname}:${port}${path}`;

    return url;
  }
}
