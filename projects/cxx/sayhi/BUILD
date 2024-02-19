load("@rules_foreign_cc//foreign_cc:defs.bzl", "cmake")

filegroup(
    name = "srcs",
    srcs = glob(["**"]),
    visibility = ["//visibility:public"],
)

cmake(
    name = "hello",
    # generate_args = ["-GNinja"],
    lib_source = ":srcs",
    out_binaries = select({
        "//:windows": ["hello.exe"],
        "//conditions:default": ["hello"],
    }),
)
