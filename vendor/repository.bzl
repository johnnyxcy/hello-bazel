"""repository rules to handle third-party dependencies"""

load(":utils.bzl", "http_archive")

def pybind11_repository(name, version):
    """pybind11_repository creates a new pybind11 repository rule.

    Args:
        name: the name of the repository rule
        version: the version of pybind11 to use
    """

    http_archive(
        name = name,
        build_file = "//vendor:pybind11-BUILD.bazel",
        strip_prefix = "pybind11-%s" % version,
        urls = ["https://github.com/pybind/pybind11/archive/v%s.zip" % version],
    )

def vendor_repository():
    pybind_version = "2.11.1"
    pybind11_repository(name = "pybind11", version = pybind_version)
