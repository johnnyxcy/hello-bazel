// @ts-check
const fs = require("fs");
const path = require("path");

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
 * @type {string[]} List of build artifacts to symlink
 */
const buildArtifacts = [".dist"];

buildArtifacts.forEach((target) => {
  const destPath = path.join(packageRoot, target);

  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath);
  } else {
    // remove every content in the directory
    fs.readdirSync(destPath).forEach((file) => {
      const joined = path.join(destPath, file);
      if (fs.lstatSync(joined).isDirectory()) {
        fs.rmdirSync(joined, { recursive: true });
      } else {
        fs.unlinkSync(joined);
      }
    });
  }

  const sourceDir = path.join(
    workspaceRoot,
    "bazel-bin",
    packageRelPath,
    target
  );

  // symlink the build artifacts
  fs.readdirSync(sourceDir).forEach((file) => {
    const source = path.join(sourceDir, file);
    const dest = path.join(destPath, file);
    fs.symlinkSync(source, dest, "junction");
  });

  // fs.symlinkSync(targetDir, targetPath, "junction");

  console.log(
    path.relative(workspaceRoot, sourceDir),
    " -> ",
    path.relative(workspaceRoot, destPath)
  );
});
