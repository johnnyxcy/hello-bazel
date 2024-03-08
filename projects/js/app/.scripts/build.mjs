import electronBuilder from "electron-builder";
import path from "node:path";
import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const rootDir = path.resolve(__dirname, "../");
const staticDir = path.join(rootDir, "static");
const buildDir = path.join(rootDir, "build");

import electronPkg from "electron/package.json" with { type: "json" };

electronBuilder.build({
  projectDir: rootDir,
  config: {
    appId: "com.johnnyxcy.hello.azel",
    productName: "HelloBazel",
    // Modify package.json for build
    extraMetadata: {
      // Change the name of the app in the package.json since the name of the app is
      // different from the name of the `dev` package
      name: "HelloBazel",
      description: "HelloBazel Application",
      //   homepage: "https://maspectra.com",
      //   author: {
      //     name: "Maspectra Dev Team",
      //     email: "mas@drugchina.net",
      //   },
    },
    directories: {
      buildResources: buildDir,
      output: path.join(buildDir, "dist"),
    },
    electronVersion: electronPkg.version,
    asar: false,
    files: [
      {
        from: path.join(rootDir, ".dist"),
        to: "./.dist",
      },
      "package.json",
    ],
    extraResources: [
      {
        from: staticDir,
        to: "./static",
      },
    ],
    // fileAssociations: [
    //   {
    //     ext: "masproj2",
    //     name: "Maspectra Project",
    //     description: "Maspectra Project File",
    //     // icon: path.join(staticDir, "icons/proj/icon.icns"),
    //   },
    // ],
    mac: {
      //   icon: path.join(staticDir, "icons/logo/icon.icns"),
      hardenedRuntime: true,
      category: "public.app-category.developer-tools",
      entitlements: path.join(buildDir, "entitlements.mac.plist"),
      entitlementsInherit: path.join(buildDir, "entitlements.mac.plist"),
      target: ["dmg"],
      type: "distribution",
    },
    dmg: {
      contents: [
        {
          x: 130,
          y: 220,
        },
        {
          x: 410,
          y: 220,
          type: "link",
          path: "/Applications",
        },
      ],
      // icon: path.join(staticDir, "icons/installer/icon.icns"),
    },
  },
});
