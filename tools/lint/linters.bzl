"Define linter aspects"

load("@aspect_rules_lint//lint:lint_test.bzl", "make_lint_test")
load("@aspect_rules_lint//lint:ruff.bzl", "ruff_aspect")
load("//tools/pyright:pyright.bzl", "lint_pyright_aspect")

ruff_linter = ruff_aspect(
    binary = "@@//tools/ruff",
    configs = ["@@//:pyproject.toml"],
)

pyright_linter = lint_pyright_aspect(
    binary = "@@//tools/pyright",
    config = "@@//:pyproject.toml",
    stubs = ["@@//:pystubs"],
)

ruff_lint_test = make_lint_test(aspect = ruff_linter)
pyright_lint_test = make_lint_test(aspect = pyright_linter)
