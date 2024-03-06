/*
 * File: @mas/desktop/src/workbench/index.tsx
 *
 * Copyright (c) 2024 Maspectra Dev Team
 */
import * as React from "react";

import ReactDOM from "react-dom/client";

import App from "./app";

let root: ReactDOM.Root | null = null;

if (!root) {
  root = ReactDOM.createRoot(
    document.querySelector<HTMLDivElement>("#maspectra-desktop-root")!
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
