"""cc rules defs"""

load("@hedron_compile_commands//:refresh_compile_commands.bzl", _refresh = "refresh_compile_commands")

def refresh_compile_commands(name):
    _refresh(
        name = name,
    )
