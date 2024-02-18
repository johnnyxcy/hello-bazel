"""Helper functions for downloading rules."""

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def download_python_rules(name, version, sha256):
    if not native.existing_rule(name):
        http_archive(
            name = name,
            sha256 = sha256,
            strip_prefix = "rules_python-{}".format(version),
            urls = [
                "https://github.com/bazelbuild/rules_python/releases/download/{}/rules_python-{}.tar.gz".format(version, version),
            ],
        )
