"""Workspace Configuration for Bazel.
"""

# Declares that this directory is the root of a Bazel workspace.
# See https://docs.bazel.build/versions/main/build-ref.html#workspace
# workspace(
#     # How this workspace would be referenced with absolute labels from another workspace
#     name = "hello_bazel",
# )

# Load the rules from the Bazel ecosystem.

# # Skilib
# load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# http_archive(
#     name = "bazel_skylib",
#     sha256 = "cd55a062e763b9349921f0f5db8c3933288dc8ba4f76dd9416aac68acee3cb94",
#     urls = [
#         "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.5.0/bazel-skylib-1.5.0.tar.gz",
#         "https://github.com/bazelbuild/bazel-skylib/releases/download/1.5.0/bazel-skylib-1.5.0.tar.gz",
#     ],
# )

# load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")

# bazel_skylib_workspace()

# # Python Setup
# # ============

# load("@hello_bazel//bazel:download.bzl", "download_python_rules")

# download_python_rules(
#     name = "rules_python",
#     sha256 = "d71d2c67e0bce986e1c5a7731b4693226867c45bfe0b7c5e0067228a536fc580",
#     version = "0.29.0",
# )

# load("@rules_python//python:repositories.bzl", "py_repositories")

# py_repositories()

# # Convert pyproject.toml to requirements.txt
# load("@hello_bazel//bazel:poetry.bzl", "generate_python_requirements_from_pyproject")

# generate_python_requirements_from_pyproject(
#     name = "gen_pip_requirements",
#     output = "requirements.lock",
# )

# load("@rules_python//python:pip.bzl", "pip_parse")

# pip_parse(
#     name = "pip_deps",
#     requirements_lock = "requirements.lock",
# )

# # Load the starlark macro which will define your dependencies.
# load("@pip_deps//:requirements.bzl", "install_deps")

# # Call it to define repos for your requirements.
# install_deps()

# # End Python Setup
# # ================
