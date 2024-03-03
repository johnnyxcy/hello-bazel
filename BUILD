load("@aspect_rules_py//py:defs.bzl", "py_venv")
load("@pypi//:requirements.bzl", "requirement")
load("//bazel:cc.bzl", "refresh_compile_commands")

exports_files([
    "pyproject.toml",
])

# label_flag(
#     name = "pyproject_toml",
#     build_setting_default = "//:pyproject.toml",
#     visibility = ["//visibility:public"],
# )

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
