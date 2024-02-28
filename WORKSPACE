"""Workspace Configuration for Bazel.
"""

# Declares that this directory is the root of a Bazel workspace.
# See https://docs.bazel.build/versions/main/build-ref.html#workspace
workspace(
    # How this workspace would be referenced with absolute labels from another workspace
    name = "hello_bazel",
)

load("//:deps.bzl", "download_deps")

download_deps()

load("//bazel/poetry:defs.bzl", "poetry_lock")

# Skilib

load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")

bazel_skylib_workspace()

# region CXX

# hedron_compile_commands setups
# See https://github.com/hedronvision/bazel-compile-commands-extractor
load("@hedron_compile_commands//:workspace_setup.bzl", "hedron_compile_commands_setup")

hedron_compile_commands_setup()

load("@hedron_compile_commands//:workspace_setup_transitive.bzl", "hedron_compile_commands_setup_transitive")

hedron_compile_commands_setup_transitive()

load("@hedron_compile_commands//:workspace_setup_transitive_transitive.bzl", "hedron_compile_commands_setup_transitive_transitive")

hedron_compile_commands_setup_transitive_transitive()

load("@hedron_compile_commands//:workspace_setup_transitive_transitive_transitive.bzl", "hedron_compile_commands_setup_transitive_transitive_transitive")

hedron_compile_commands_setup_transitive_transitive_transitive()

# endreigon

# Python

# Load the repositories for the Python rules
load("@aspect_rules_py//py:repositories.bzl", "rules_py_dependencies")

rules_py_dependencies()

# Load the repositories for the Python rules
load("@rules_python//python:repositories.bzl", "py_repositories", "python_register_toolchains")

# Register the Python toolchains
python_register_toolchains(
    name = "python_toolchain",
    python_version = "3.11",
    register_coverage_tool = True,
)

py_repositories()

# poetry.lock converted to requirements.txt
poetry_lock(
    name = "py_requirements_lock",
    lockfile = "//:poetry.lock",
)

load("@python_toolchain//:defs.bzl", "interpreter")

# Load the pip_parse macro which will parse the requirements_lock.txt file
load("@rules_python//python:pip.bzl", "pip_parse")

# Create a central repo that knows about the dependencies needed from
# requirements_lock.txt.
pip_parse(
    name = "pypi",
    python_interpreter_target = interpreter,
    requirements_lock = "@py_requirements_lock//:requirements_lock.txt",
)

# Load the starlark macro which will define your dependencies.
load("@pypi//:requirements.bzl", "install_deps")

# Call it to define repos for your requirements.
install_deps(
    python_interpreter_target = interpreter,
    quiet = False,
)
