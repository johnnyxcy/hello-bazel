load("@aspect_rules_py//py:defs.bzl", "py_pytest_main", "py_test")
load("@pypi//:requirements.bzl", "requirement")

filegroup(
    name = "srcs",
    srcs = glob(["**/*.py"]),
    visibility = ["//visibility:public"],
)

py_pytest_main(
    name = "__test__",
    deps = [requirement("pytest")],
)

py_test(
    name = "greet_test",
    srcs = [
        ":__test__",
        ":test_srcs",
    ],
    imports = ["./src"],
    main = ":__test__.py",
    visibility = ["//visibility:public"],
    deps = [
        ":__test__",
        ":greet",
        requirement("pytest"),
    ],
)
