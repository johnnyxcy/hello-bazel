load("@aspect_rules_js//js:defs.bzl", "js_run_binary")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")

def npm_module(name, srcs, tool, out_dirs, **kwargs):
    js_run_binary(
        name = "vite.build",
        srcs = srcs,
        args = ["build"],
        mnemonic = "ViteBuild",
        out_dirs = out_dirs,
        tool = tool,
    )
    return npm_package(
        name = name,
        srcs = [
            "package.json",
            ":vite.build",
        ],
        **kwargs
    )
