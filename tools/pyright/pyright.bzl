"""Pyright lint wrapper"""

load("//tools/lint/private:aspect.bzl", "filter_srcs", "report_file")

_MNEMONIC = "pyright"
PYTHON_TOOLCHAIN_TYPE = "@bazel_tools//tools/python:toolchain_type"

def pyright_action(ctx, executable, srcs, config, stubs, report, use_exit_code = False):
    """Run pyright as an action under Bazel.

    Args:
        ctx: Bazel Rule or Aspect evaluation context
        executable: label of the the pyright program
        srcs: python files to be linted
        config: label of the pyright config file (pyrightconfig.json or pyproject.toml)
        stubs: label of the stubs directory
        report: output file to generate
        use_exit_code: whether to fail the build when a lint violation is reported
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
    args.add_all(srcs)
    args.add(config, format = "--project=%s")

    args.add_all(["--pythonpath", interpreter])

    # args.add("--verbose")
    if use_exit_code:
        command = "{pyright} $@ && touch {report}"
    else:
        args.add("--outputjson")
        command = "{pyright} $@ >{report} || true"
    command = command.format(
        pyright = executable.path,
        report = report.path,
    )

    ctx.actions.run_shell(
        inputs = inputs,
        outputs = outputs,
        tools = [
            executable,
        ],
        command = command,
        arguments = [args],
        env = env,
        mnemonic = _MNEMONIC,
    )

# buildifier: disable=function-docstring
def _pyright_aspect_impl(target, ctx):
    if ctx.rule.kind not in ["py_binary", "py_library"]:
        return []

    report, info = report_file(_MNEMONIC, target, ctx)

    pyright_action(
        use_exit_code = ctx.attr.fail_on_violation,
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
            "fail_on_violation": attr.bool(),
            "_pyright": attr.label(
                default = binary,
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
