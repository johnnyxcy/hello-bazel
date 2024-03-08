/*
 * File: @mas/desktop/src/platform/main.ts
 *
 * Copyright (c) 2023 - 2024 Maspectra Dev Team
 */
import { BrowserWindow, app, ipcMain, shell } from "electron";
import { release } from "node:os";
import path, { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs";
import cp from "child_process";

/**
 * @see: ESModule Support for CommonJS __dirname and __filename
 */
globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = dirname(__filename);

process.env.DIST = join(__dirname, "../");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST, "../public")
  : process.env.DIST;

if (process.platform === "win32") {
  // Set application name for Windows 10+ notifications
  app.setAppUserModelId(app.getName());

  // Disable GPU Acceleration for Windows 7
  if (release().startsWith("6.1")) {
    app.disableHardwareAcceleration();
  }
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(0);
}

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "preload.js");
const devUrl = process.env.VITE_DEV_SERVER_URL;
const workbenchHtml = devUrl
  ? join(devUrl, "src/workbench/index.html")
  : join(process.env.DIST, "renderer/workbench.html");

const staticDir = path.join(process.resourcesPath, "static");
const calculator = path.join(staticDir, "calculator");
const calculatorProcess = cp.spawn(calculator, []);
calculatorProcess.stdout.on("data", (data) => {
  fs.writeFileSync("/Users/johnnyxcy/Workspace/hello-bazel/temp/log.txt", data);
});

async function createWindow(): Promise<void> {
  win = new BrowserWindow({
    title: "Main window",
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (devUrl) {
    // electron-vite-vue#298
    win.loadURL(workbenchHtml);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  } else {
    win.loadFile(workbenchHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  // Apply electron-updater
  // update(win);
}

app
  .whenReady()
  .then(createWindow)
  .catch(() => {});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (devUrl) {
    childWindow.loadURL(`${devUrl}#${arg}`);
  } else {
    childWindow.loadFile(workbenchHtml, { hash: arg });
  }
});
