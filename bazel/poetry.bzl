"""Bazel rules to handle poetry configuration files. 
"""

def _generate_python_requirements_from_pyproject_impl(repository_ctx):
    """Implementation of the `generate_python_requirements_from_pyproject` rule.
    """
    working_dir = repository_ctx.attr.root or "{}".format(repository_ctx.workspace_root)

    poetry = repository_ctx.which("poetry")
    if not poetry:
        fail("poetry not found in PATH")

    poetry_path = "{}".format(poetry)

    result = repository_ctx.execute(
        [poetry_path, "export", "-f", "requirements.txt", "--no-interaction"],
        # quiet = False,
        working_directory = working_dir,
    )

    if result.stderr:
        fail(result.stderr)
    if result.stdout:
        repository_ctx.file(repository_ctx.attr.output, content = result.stdout, executable = False)

generate_python_requirements_from_pyproject = repository_rule(
    implementation = _generate_python_requirements_from_pyproject_impl,
    local = True,
    attrs = {
        "root": attr.string(
            # doc = "The working directory. Poetry configuration file (pyproject.toml) should be in this directory.",
            doc = "The working directory. Poetry configuration file (pyproject.toml) should be in this directory.",
            default = "",
        ),
        "output": attr.label(
            doc = "The output file to write the requirements to.",
            default = "//:requirements.txt",
        ),
    },
    doc = "Generate a requirements.txt file from a poetry configuration file.",
)
