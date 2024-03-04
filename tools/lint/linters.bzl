"Define linter aspects"

load("@aspect_rules_lint//lint:lint_test.bzl", "make_lint_test")
load("@aspect_rules_lint//lint:ruff.bzl", "ruff_aspect")

ruff_linter = ruff_aspect(
    binary = "@@//tools/ruff",
    configs = ["@@//:pyproject.toml"],
)

ruff_lint_test = make_lint_test(aspect = ruff_linter)
