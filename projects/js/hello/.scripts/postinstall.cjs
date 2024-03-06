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
  const targetPath = path.join(packageRoot, target);

  try {
    const stats = fs.lstatSync(targetPath);
    if (stats.isSymbolicLink()) {
      fs.unlinkSync(targetPath);
    } else {
      fs.rmdirSync(targetPath);
    }
  } catch (e) {
    // noop
  }

  const targetDir = path.join(
    workspaceRoot,
    "bazel-bin",
    packageRelPath,
    target
  );
  fs.symlinkSync(targetDir, targetPath, "junction");

  console.log(
    path.relative(workspaceRoot, targetDir),
    " -> ",
    path.relative(workspaceRoot, targetPath)
  );
});
