filegroup(
    name = "srcs",
    srcs = glob([
        "**/*.cc",
        "**/*.h",
    ]),
    visibility = ["//visibility:public"],
)

cc_binary(
    name = "calculator",
    srcs = [":srcs"],
    copts = [
        "-std=c++17",
        "-DEIGEN_USE_BLAS=0",
        "-gdwarf-4",
    ],
    visibility = ["//visibility:public"],
    deps = [
        "//projects/cxx/libcalc",
    ],
)
