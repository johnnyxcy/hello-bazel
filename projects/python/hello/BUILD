"""Python Binary"""

load("@aspect_rules_py//py:defs.bzl", "py_binary")
load("@pypi//:requirements.bzl", "requirement")

py_binary(
    name = "hello",
    srcs = ["main.py"],
    imports = [".."],
    deps = [
        requirement("pandas"),
        "//projects/python/greet",
    ],
)
