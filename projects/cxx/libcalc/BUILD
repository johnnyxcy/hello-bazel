filegroup(
    name = "srcs",
    srcs = glob([
        "src/**/*.hpp",
    ]),
    visibility = ["//visibility:public"],
)

cc_library(
    name = "libcalc",
    srcs = [":srcs"],
    hdrs = [":srcs"],
    includes = ["./src"],
    visibility = [
        "//projects/cxx/calculator:__pkg__",
        "//projects/cxx/libcalc:__subpackages__",
    ],
    deps = [
        "@com_gitlab_libeigen_eigen//:eigen",
    ],
)
