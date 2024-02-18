"""Workspace Configuration for Bazel.
"""

# Declares that this directory is the root of a Bazel workspace.
# See https://docs.bazel.build/versions/main/build-ref.html#workspace
workspace(
    # How this workspace would be referenced with absolute labels from another workspace
    name = "hello_bazel",
)

load("//bazel:download.bzl", "download_python_rules")

download_python_rules("rules_python", "0.29.0", "d71d2c67e0bce986e1c5a7731b4693226867c45bfe0b7c5e0067228a536fc580")

load("@rules_python//python:repositories.bzl", "py_repositories")

py_repositories()
