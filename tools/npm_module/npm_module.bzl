"""npm pakcage wrapper"""

load("@aspect_bazel_lib//lib:run_binary.bzl", "run_binary")
load("@aspect_rules_js//js:defs.bzl", "js_run_binary")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")

def npm_module(name, srcs, tool, out_dirs, **kwargs):
    """Make a npm module.

    Args:
        name: name of rule
        srcs: package sources
        tool: tools, such as `@npm//:vite`
        out_dirs: output directories
        **kwargs: other arguments pass to npm_package
    """
    js_run_binary(
        name = "vite.build",
        srcs = srcs,
        args = ["build"],
        mnemonic = "ViteBuild",
        out_dirs = out_dirs,
        tool = tool,
    )
    native.py_binary(
        name = "link",
        srcs = ["//tools/artifacts:link_artifacts.py"],
        data = [":vite.build"],
        main = "link_artifacts.py",
        args = [
            "--resolve",
            "--is-dir",
            "--src",
            "$(rootpath :vite.build)",
            "--dest",
            "$(rootpath :vite.build)",
        ],
        visibility = ["//visibility:public"],
    )
    run_binary(
        name = "do_link",
        srcs = srcs + [":vite.build"],
        outs = ["link_dist.log"],
        args = [
            "--resolve",
            "--is-dir",
            "--src",
            "$(execpath :vite.build)",
            "--dest",
            "$(rootpath :vite.build)",
            "--log",
            "$(RULEDIR)/link_dist.log",
        ],
        tool = ":link",
    )

    npm_package(
        name = name,
        srcs = [
            "package.json",
            ":vite.build",
            ":do_link",
        ],
        **kwargs
    )
