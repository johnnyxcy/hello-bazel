// @ts-check

const fs = require("node:fs");
const path = require("node:path");

/**
 * @type {string} Absolute path of this package
 */
const packageRoot = path.resolve(__dirname, "..");

/**
 * @type {string} Absolute path of the workspace root
 */
const workspaceRoot = path.resolve(__dirname, "../../../..");

/**
 * @type {string} Relative path of this package from the workspace root
 */
const packageRelPath = path.relative(workspaceRoot, packageRoot);

/**
 * @type {string[]} Command line arguments
 */
const args = process.argv.slice(2);

/**
 * @type {string} Target package to symlink. Defaults to the package name
 */
const target =
  args.find((arg) => /^--target=.+$/.test(arg))?.split("=")[1] ??
  path.basename(packageRoot);

/**
 * @type {string[]} List of build artifacts to symlink. Defaults to .dist
 */
const artifactDirs = args
  .find((arg) => /^--artifacts=.+$/.test(arg))
  ?.split("=")[1]
  ?.split(":") ?? [".dist"];

// symlink the build artifacts
artifactDirs.forEach((artifactName) => {
  const destDir = path.join(packageRoot, artifactName);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  } else {
    // remove every content in the directory
    fs.readdirSync(destDir).forEach((file) => {
      const joined = path.join(destDir, file);
      if (fs.lstatSync(joined).isDirectory()) {
        fs.rmSync(joined, { recursive: true });
      } else {
        fs.unlinkSync(joined);
      }
    });
  }

  const artifactDir = path.join(
    workspaceRoot,
    "bazel-bin",
    packageRelPath,
    target,
    artifactName,
  );

  if (!fs.existsSync(artifactDir)) {
    console.warn(
      `No build artifacts found for '${packageRelPath}'. Consider to build the package with bazel first.`,
    );
    console.warn(`bazel build //${packageRelPath}`);
    return;
  }

  // symlink the build artifacts
  fs.readdirSync(artifactDir).forEach((file) => {
    const artifactPath = path.join(artifactDir, file);
    const destPath = path.join(destDir, file);
    fs.symlinkSync(artifactPath, destPath, "junction");
  });

  console.log(
    path.relative(workspaceRoot, artifactDir),
    " -> ",
    path.relative(workspaceRoot, destDir),
  );
});
