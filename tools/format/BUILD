load("@aspect_rules_lint//format:defs.bzl", "multi_formatter_binary")

multi_formatter_binary(
    name = "format",
    cc = "@llvm_toolchain_llvm//:bin/clang-format",
    python = "//tools/ruff",
)
