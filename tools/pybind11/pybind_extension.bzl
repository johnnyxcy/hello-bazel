"""This is a helper module for building Python extension modules using pybind11.

Code is adapted from the pybind11_bazel project https://github.com/pybind/pybind11_bazel/blob/master/build_defs.bzl

On top of the original code, this module adds support for stubgen and outputting the generated .pyi file.
"""

load("@aspect_bazel_lib//lib:run_binary.bzl", "run_binary")
load("@bazel_skylib//rules:copy_file.bzl", "copy_file")

PYBIND_COPTS = select({
    Label("@pybind11//:msvc_compiler"): [],
    "//conditions:default": ["-fexceptions"],
})

PYBIND_FEATURES = [
    "-use_header_modules",  # Required for pybind11.
    "-parse_headers",
]

PYBIND_DEPS = [
    Label("@pybind11//:pybind11"),
    "@rules_python//python/cc:current_py_cc_headers",
]

# Builds a Python extension module using pybind11.
# This can be directly used in Python with the import statement.
# Assuming the name NAME, the following targets will be defined:
#   1. NAME.so - the shared/dynamic library for the extension module
#   2. NAME.pyd - a copy of NAME.so named for Python on Windows; see
#                 https://github.com/pybind/pybind11_bazel/issues/74
#   3. NAME - an alias pointing to either NAME.so or NAME.pyd as per
#             the platform OS (not-Windows or Windows, respectively)
# Generally, the user will "depend" on this extension module via the
# data attribute of their py_* target; specifying NAME is preferred.
def pybind_extension(
        name,
        srcs,
        stubgen = True,
        copts = [],
        features = [],
        linkopts = [],
        tags = [],
        deps = [],
        **kwargs):
    """Builds a Python extension module using pybind11.

    Args:
        name: The name of the extension module.
        srcs: A list of source files.
        stubgen: Whether to generate a .pyi file using stubgen.
        copts: A list of compiler options.
        features: A list of features.
        linkopts: A list of linker options.
        tags: A list of tags.
        deps: A list of dependencies.
        **kwargs: Additional arguments to pass to native.cc_binary.
    """

    # Mark common dependencies as required for build_cleaner.
    tags = tags + ["req_dep=%s" % dep for dep in PYBIND_DEPS]

    native.cc_binary(
        name = name + ".so",
        srcs = srcs,
        copts = copts + PYBIND_COPTS + select({
            Label("@pybind11//:msvc_compiler"): [],
            "//conditions:default": ["-fvisibility=hidden"],
        }),
        features = features + PYBIND_FEATURES,
        linkopts = linkopts + select({
            "@platforms//os:osx": ["-undefined", "dynamic_lookup"],
            Label("@pybind11//:msvc_compiler"): [],
            "//conditions:default": ["-Wl,-Bsymbolic"],
        }),
        linkshared = 1,
        tags = tags,
        deps = deps + PYBIND_DEPS,
        **kwargs
    )
    copy_file(
        name = name + "_copy_so_to_pyd",
        src = name + ".so",
        out = name + ".pyd",
    )
    alias_name = name + "_pyext"
    native.alias(
        name = alias_name,
        actual = select({
            "@platforms//os:windows": name + ".pyd",
            "//conditions:default": name + ".so",
        }),
    )

    data = [alias_name]

    if stubgen:
        run_binary(
            name = name + "_stubgen",
            tool = "//tools/pybind11:stubgen",
            srcs = srcs + [":{alias_name}".format(alias_name = alias_name)],
            out_dirs = [name],
            args = [
                "--working-dir",
                "$(RULEDIR)",
                "--output-dir",
                "$(RULEDIR)",
                "--no-setup-py",
                "--ignore-invalid",
                "all",
                "--bare-numpy-ndarray",
                "--root-module-suffix",
                "",
                name,
            ],
            execution_requirements = {
                "no-sandbox": "1",
            },
        )

        data.append(":{name}_stubgen".format(name = name))

    native.py_library(
        name = name,
        data = data,
        visibility = ["//visibility:public"],
    )
