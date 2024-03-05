"""This file is a wrapper around the http_archive and http_file rules"""

load("@bazel_tools//tools/build_defs/repo:http.bzl", _http_archive = "http_archive", _http_file = "http_file")
load("@bazel_tools//tools/build_defs/repo:utils.bzl", "maybe")

def http_archive(name, **kwargs):
    maybe(
        _http_archive,
        name = name,
        **kwargs
    )

def http_file(name, **kwargs):
    maybe(
        _http_file,
        name = name,
        **kwargs
    )
