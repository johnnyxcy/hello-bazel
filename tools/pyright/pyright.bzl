"""Pyright lint wrapper"""

load("//tools/lint/private:aspect.bzl", "filter_srcs", "report_file")

_MNEMONIC = "pyright"
PYTHON_TOOLCHAIN_TYPE = "@bazel_tools//tools/python:toolchain_type"

def pyright_action(ctx, executable, srcs, config, stubs, report):
    """Run pyright as an action under Bazel.

    Args:
        ctx: Bazel Rule or Aspect evaluation context
        executable: label of the the pyright program
        srcs: python files to be linted
        config: label of the pyright config file (pyrightconfig.json or pyproject.toml)
        stubs: label of the stubs directory
        report: output file to generate
    """

    inputs = srcs + stubs + [config]
    interpreter = ctx.toolchains[PYTHON_TOOLCHAIN_TYPE].py3_runtime.interpreter.path

    is_windows = ctx.target_platform_has_constraint(
        ctx.attr._windows_constraints[platform_common.ConstraintValueInfo],
    )
    env = {"BAZEL_BINDIR": "."}

    workspace_root = ctx.configuration.default_shell_env.get("__WORKSPACE_ROOT__", "")
    if workspace_root:
        if is_windows:
            interpreter = "{workspace_root}\\.venv\\Scripts\\python.exe".format(workspace_root = workspace_root)
        else:
            interpreter = "{workspace_root}/.venv/bin/python".format(workspace_root = workspace_root)
        env["BAZEL_BINDIR"] = workspace_root

    outputs = [report]

    # Wire command-line options, see
    args = ctx.actions.args()
    args.add("--report")
    args.add(report.path)
    args.add("--fix-relpath")
    args.add("--pyright")
    args.add(executable.path)
    args.add("--")
    args.add("--project={config}".format(config = config.path))
    args.add("--pythonpath={interpreter}".format(interpreter = interpreter))
    args.add_all(srcs)

    ctx.actions.run(
        inputs = inputs,
        outputs = outputs,
        arguments = [args],
        executable = ctx.executable._entry,
        env = env,
        mnemonic = _MNEMONIC,
        tools = [
            executable,
        ],
    )

# buildifier: disable=function-docstring
def _pyright_aspect_impl(target, ctx):
    if ctx.rule.kind not in ["py_binary", "py_library"]:
        return []

    report, info = report_file(_MNEMONIC, target, ctx)

    pyright_action(
        report = report,
        stubs = ctx.files._stubs,
        config = ctx.file._config_file,
        srcs = filter_srcs(ctx.rule),
        ctx = ctx,
        executable = ctx.executable._pyright,
    )
    return [info]

def lint_pyright_aspect(binary, config, stubs = []):
    """A factory function to create a linter aspect.

    Attrs:
        binary: a pyright executable. Can be from node_modules with rules_js

        config: the pyright config file (pyrightconfig.json or pyproject.toml)
    """
    return aspect(
        implementation = _pyright_aspect_impl,
        # Edges we need to walk up the graph from the selected targets.
        # Needed for linters that need semantic information like transitive type declarations.
        # attr_aspects = ["deps"],
        attrs = {
            "_pyright": attr.label(
                default = binary,
                executable = True,
                cfg = "exec",
            ),
            "_entry": attr.label(
                default = "//tools/pyright:run",
                executable = True,
                cfg = "exec",
            ),
            "_stubs": attr.label_list(default = stubs),
            "_config_file": attr.label(
                default = config,
                allow_single_file = True,
            ),
            "_windows_constraints": attr.label(
                default = "@platforms//os:windows",
            ),
        },
        toolchains = [
            PYTHON_TOOLCHAIN_TYPE,
        ],
    )
