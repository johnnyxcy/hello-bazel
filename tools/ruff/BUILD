"""Python Binary"""

load("@aspect_rules_py//py:defs.bzl", "py_binary")
load("@pypi//:requirements.bzl", "data_requirement", "requirement")

py_binary(
    name = "ruff",
    srcs = ["cli.py"],
    data = [
        data_requirement("ruff"),
    ],
    deps = [
        requirement("ruff"),
    ],
)
