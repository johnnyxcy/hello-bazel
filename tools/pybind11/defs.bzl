"""Build python extension using pybind11."""

load(":pybind_extension.bzl", _pybind_extension = "pybind_extension")

pybind_extension = _pybind_extension
