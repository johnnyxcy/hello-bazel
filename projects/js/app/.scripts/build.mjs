// @ts-check

import electronBuilder from "electron-builder";

import path from "node:path";
import * as url from "url";
import yargs from "yargs";
import electronPkg from "electron/package.json" with { type: "json" };

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const packageDir = path.resolve(__dirname, "../");
const staticDir = path.join(packageDir, "static");
const buildDir = path.join(packageDir, "build");

const argv = yargs(process.argv)
  .option("out", {
    type: "string",
    alias: "o",
    description: "Output directory",
  })
  .option("extra-resources", {
    type: "string",
    array: true,
    description:
      "Extra path to collect. Follow the pattern `from:to`. Example: `../some/src:some/dest`",
  })
  .parseSync();

const outputDir = argv.out || path.join(buildDir, "dist");

/**
 * @type {[string, string][]}
 */
const extraResources =
  argv.extraResources?.map((v) => {
    const [from, to] = v.split(":");
    return [path.resolve(packageDir, from), to];
  }) ?? [];

electronBuilder.build({
  projectDir: packageDir,
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
      output: outputDir,
    },
    electronVersion: electronPkg.version,
    asar: false,
    files: [
      {
        from: path.join(packageDir, ".dist"),
        to: "./.dist",
      },
      "package.json",
    ],
    extraResources: [
      {
        from: staticDir,
        to: "./static",
      },
      ...extraResources.map(([from, to]) => {
        return {
          from,
          to: `./static/${to}`,
        };
      }),
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
