"""http_archive wrapper that uses maybe to allow for conditional"""

load("@bazel_tools//tools/build_defs/repo:http.bzl", _http_archive = "http_archive")
load("@bazel_tools//tools/build_defs/repo:utils.bzl", "maybe")

def http_archive(name, **kwargs):
    """
    Wrapper around http_archive that uses maybe to allow for conditional
    """
    return maybe(
        _http_archive,
        name = name,
        **kwargs
    )
