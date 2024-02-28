# load("@rules_foreign_cc//foreign_cc:defs.bzl", "cmake", "runnable_binary")

filegroup(
    name = "srcs",
    srcs = glob([
        "**/*.cc",
        "**/*.h",
    ]),
    visibility = ["//visibility:public"],
)

cc_binary(
    name = "main",
    srcs = [":srcs"],
    includes = ["include"],
)
