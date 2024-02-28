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
