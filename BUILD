load("@aspect_rules_py//py:defs.bzl", "py_venv")
load("@pypi//:requirements.bzl", "requirement")
load("//bazel:cc.bzl", "refresh_compile_commands")

refresh_compile_commands(
    name = "refresh_cc",
)

py_venv(
    name = "venv",
    # deps = all_requirements + [
    deps = [
        requirement("pandas"),
        requirement("numpy"),
        requirement("pydantic"),
        requirement("ruff"),
        # Add any additional requirements here
    ],
)
