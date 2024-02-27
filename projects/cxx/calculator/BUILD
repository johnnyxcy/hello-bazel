filegroup(
    name = "srcs",
    srcs = glob(["**"]),
    visibility = ["//visibility:public"],
)

cc_binary(
    name = "main",
    srcs = [":srcs"],
    visibility = ["//visibility:public"],
    deps = [
        "//projects/cxx/libcalc",
    ],
)
