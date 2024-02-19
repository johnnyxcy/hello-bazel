def _hello_repo_impl(ctx):
    print("123123")
    ctx.file("hello.txt", ctx.attr.message)
    ctx.file("BUILD.bazel", 'exports_files(["hello.txt"])')

hello_repo = repository_rule(
    implementation = _hello_repo_impl,
    attrs = {
        "message": attr.string(
            mandatory = True,
        ),
    },
)
