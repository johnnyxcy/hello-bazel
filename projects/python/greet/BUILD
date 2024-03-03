# load("@//bazel/ruff:defs.bzl", "ruff_format_test")
load("@aspect_rules_py//py:defs.bzl", "py_library")
load("@pypi//:requirements.bzl", "requirement")

# load("//bazel/ruff:defs.bzl", "ruff_format_fix")
load("//tools/lint:linters.bzl", "ruff_lint_test")

filegroup(
    name = "srcs",
    srcs = glob([
        "src/**/*.py",
        "src/**/*.pyi",
    ]),
    visibility = ["//visibility:public"],
)

py_library(
    name = "greet",
    srcs = [":srcs"],
    imports = ["./src"],
    visibility = ["//projects/python:__subpackages__"],
    deps = [requirement("pydantic")],
)

# ruff_format_fix(
#     name = "format_fix",
#     srcs = [":srcs"],
#     visibility = ["//visibility:public"],
# )

ruff_lint_test(
    name = "lint_test",
    srcs = [":srcs"],
)
