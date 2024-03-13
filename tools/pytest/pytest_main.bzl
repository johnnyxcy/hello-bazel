"""py_test entrypoint generation.
"""

def _py_pytest_main_impl(ctx):
    substitutions = {
        "$$FLAGS$$": ", ".join(['"{}"'.format(f) for f in ctx.attr.args]).strip(),
        # Leaving CHDIR empty results in potentially user facing issues w/
        # black and flake8, so we'll just assign something trivial as a no-op.
        "$$CHDIR$$": "os.chdir('{}')".format(ctx.attr.chdir) if ctx.attr.chdir else "_ = 0",
    }

    ctx.actions.expand_template(
        template = ctx.file._template,
        output = ctx.outputs.out,
        substitutions = dict(substitutions, **ctx.var),
        is_executable = False,
    )

_py_pytest_main = rule(
    implementation = _py_pytest_main_impl,
    attrs = {
        "args": attr.string_list(
            doc = "Additional arguments to pass to pytest.",
        ),
        "chdir": attr.string(
            doc = "A path to a directory to chdir when the test starts.",
            mandatory = False,
        ),
        "out": attr.output(
            doc = "The output file.",
            mandatory = True,
        ),
        "_template": attr.label(
            doc = """INTERNAL USE ONLY. 
            A python script to be called as the pytest main.
            Variables such as `$$CHDIR$$` and `$$FLAGS$$` are replaced before executing the script.
            This is not considered a Public API. Variable replacements may change without warning.
            """,
            allow_single_file = True,
            default = Label(":pytest.py.tpl"),
        ),
    },
)

def py_pytest_main(name, deps = [], data = [], testonly = True, **kwargs):
    """py_pytest_main wraps the template rendering target and the final py_library.

    Args:
        name: The name of the runable target that updates the test entry file.
        deps: A list containing the pytest library target, e.g., @pypi_pytest//:pkg.
        data: A list of data dependencies to pass to the py_library target.
        testonly: A boolean indicating if the py_library target is testonly.
        **kwargs: The extra arguments passed to the template rendering target.
    """

    test_main = name + ".py"
    tags = kwargs.pop("tags", [])
    visibility = kwargs.pop("visibility", [])

    _py_pytest_main(
        name = "%s_template" % name,
        out = test_main,
        tags = tags,
        visibility = visibility,
        **kwargs
    )

    native.py_library(
        name = name,
        testonly = testonly,
        srcs = [test_main],
        tags = tags,
        visibility = visibility,
        deps = deps,
        data = data,
    )
