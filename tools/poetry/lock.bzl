"""Implementation of the poetry_lock rule.
"""

def _poetry_impl(repo_ctx):
    if repo_ctx.attr.poetry != None:
        cmd = [repo_ctx.path(repo_ctx.attr.poetry), "export"]
    else:
        cmd = ["poetry", "export"]

    for group in repo_ctx.attr.groups:
        cmd.append("--with=" + group)

    result = repo_ctx.execute(
        cmd,
        working_directory = str(repo_ctx.path(repo_ctx.attr.lockfile).dirname),
    )

    if result.return_code != 0:
        fail("Failed to execute poetry. Error: ", result.stderr)

    repo_ctx.file("requirements_lock.txt", result.stdout)
    repo_ctx.file("BUILD", "")

poetry_lock = repository_rule(
    implementation = _poetry_impl,
    local = True,
    attrs = {
        "lockfile": attr.label(
            allow_single_file = True,
            mandatory = True,
        ),
        "groups": attr.string_list(
            default = ["dev"],
        ),
        "poetry": attr.label(
            allow_single_file = True,
            mandatory = False,
            executable = True,
            cfg = "exec",
        ),
    },
)
