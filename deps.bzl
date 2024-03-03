"""External bazel rules dependencies for the project."""

load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("//bazel:http.bzl", "http_archive")

def download_deps():
    """
    Downloads the dependencies for the project.
    """
    http_archive(
        name = "bazel_skylib",
        sha256 = "cd55a062e763b9349921f0f5db8c3933288dc8ba4f76dd9416aac68acee3cb94",
        urls = [
            "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.5.0/bazel-skylib-1.5.0.tar.gz",
            "https://github.com/bazelbuild/bazel-skylib/releases/download/1.5.0/bazel-skylib-1.5.0.tar.gz",
        ],
    )

    http_archive(
        name = "buildifier_prebuilt",
        sha256 = "8ada9d88e51ebf5a1fdff37d75ed41d51f5e677cdbeafb0a22dda54747d6e07e",
        strip_prefix = "buildifier-prebuilt-6.4.0",
        urls = [
            "http://github.com/keith/buildifier-prebuilt/archive/6.4.0.tar.gz",
        ],
    )

    http_archive(
        name = "rules_python",
        sha256 = "c68bdc4fbec25de5b5493b8819cfc877c4ea299c0dcb15c244c5a00208cde311",
        strip_prefix = "rules_python-0.31.0",
        url = "https://github.com/bazelbuild/rules_python/releases/download/0.31.0/rules_python-0.31.0.tar.gz",
    )

    # http_archive(
    #     name = "aspect_rules_py",
    #     sha256 = "d60bb474069d77314532c3dd36ef162ab91ef3fe6e04d60836bd922a08e9fb4b",
    #     strip_prefix = "rules_py-0.6.0",
    #     url = "https://github.com/aspect-build/rules_py/releases/download/v0.6.0/rules_py-v0.6.0.tar.gz",
    # )

    # @aspect_rules_py@^0.7 is not yet released, but we need the venv fix. So we need to use the commit id
    # Change to http_archive when it's available (v0.7 or later)
    asepct_rules_py_commit_id = "82ad68fe2e6ba695a528a8748a2f796c1da8c4c0"
    git_repository(
        name = "aspect_rules_py",
        remote = "https://github.com/aspect-build/rules_py",
        commit = asepct_rules_py_commit_id,
    )
    hedron_compile_commands_commit_id = "204aa593e002cbd177d30f11f54cff3559110bb9"
    http_archive(
        name = "hedron_compile_commands",

        # Replace the commit hash in both places (below) with the latest (https://github.com/hedronvision/bazel-compile-commands-extractor/commits/main), rather than using the stale one here.
        # Even better, set up Renovate and let it do the work for you (see "Suggestion: Updates" in the README).
        url = "https://github.com/hedronvision/bazel-compile-commands-extractor/archive/{}.tar.gz".format(hedron_compile_commands_commit_id),
        strip_prefix = "bazel-compile-commands-extractor-{}".format(hedron_compile_commands_commit_id),
        # When you first run this tool, it'll recommend a sha256 hash to put here with a message like: "DEBUG: Rule 'hedron_compile_commands' indicated that a canonical reproducible form can be obtained by modifying arguments sha256 = ..."
    )

    # Eigen
    http_archive(
        name = "com_gitlab_libeigen_eigen",
        urls = [
            "https://gitlab.com/libeigen/eigen/-/archive/3.4.0/eigen-3.4.0.tar.bz2",
        ],
        strip_prefix = "eigen-3.4.0",
        build_file_content = """
cc_library(
    name = 'eigen',
    srcs = [],
    includes = ['.'],
    hdrs = glob(['Eigen/**']),
    visibility = ['//visibility:public'],
)
""",
    )

    http_archive(
        name = "com_google_googletest",
        urls = ["https://github.com/google/googletest/archive/refs/tags/v1.14.0.zip"],
        strip_prefix = "googletest-1.14.0",
    )

    http_archive(
        name = "aspect_bazel_lib",
        sha256 = "979667bb7276ee8fcf2c114c9be9932b9a3052a64a647e0dcaacfb9c0016f0a3",
        strip_prefix = "bazel-lib-2.4.1",
        url = "https://github.com/aspect-build/bazel-lib/releases/download/v2.4.1/bazel-lib-v2.4.1.tar.gz",
    )

    http_archive(
        name = "aspect_rules_js",
        sha256 = "edc7b0255114fafdbbd593ea5d5fdfd54b2a603f33b3a49518910ac618e1bf2b",
        strip_prefix = "rules_js-1.38.0",
        url = "https://github.com/aspect-build/rules_js/releases/download/v1.38.0/rules_js-v1.38.0.tar.gz",
    )

    http_archive(
        name = "toolchains_llvm",
        canonical_id = "0.10.3",
        sha256 = "b7cd301ef7b0ece28d20d3e778697a5e3b81828393150bed04838c0c52963a01",
        strip_prefix = "toolchains_llvm-0.10.3",
        url = "https://github.com/grailbio/bazel-toolchain/releases/download/0.10.3/toolchains_llvm-0.10.3.tar.gz",
    )

    http_archive(
        name = "aspect_rules_lint",
        sha256 = "41fad363f11ccab46a244f93f8ccb0f442bc235e606d2fad87801987ad0759b1",
        strip_prefix = "rules_lint-0.12.0",
        url = "https://github.com/aspect-build/rules_lint/releases/download/v0.12.0/rules_lint-v0.12.0.tar.gz",
    )
