cc_test(
    name = "tests",
    srcs = glob([
        "**/test_*.cc",
    ]),
    visibility = ["//visibility:private"],
    deps = [
        "//projects/cxx/libcalc",
        "@googletest//:gtest_main",
    ],
)
