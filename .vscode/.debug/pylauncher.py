import argparse
import importlib.util
import os
import pathlib
import sys


def parse_args(args: list[str]):
    parser = argparse.ArgumentParser(description="Python Launcher")
    parser.add_argument(
        "--file", help="Script to run", required=True, type=pathlib.Path
    )
    return parser.parse_args(args)


def main():
    args_ = sys.argv[1:]
    if not args_:
        sys.stderr.write("No file to run\n")
        sys.exit(1)

    if "--" in args_:
        idx = args_.index("--")
        passthrough_args = args_[idx + 1 :]
        args_ = args_[:idx]
    else:
        passthrough_args = []

    args = parse_args(args_)
    fp: pathlib.Path = args.file

    if not fp.exists():
        raise FileNotFoundError(f"File not found: {fp}")

    if pathlib.Path(__file__) == fp:
        raise ValueError("Cannot run this file")

    spec = importlib.util.spec_from_file_location("__main__", fp)

    if not spec or not spec.loader:
        raise ImportError(f"Could not load file: {fp}")

    module = importlib.util.module_from_spec(spec)
    sys.modules["__main__"] = module
    sys.stderr.write(
        "\033[31;1;4m[PID={pid}] {relpath}{args}\033[0m\n".format(
            pid=os.getpid(),
            relpath=fp.relative_to(pathlib.Path.cwd()),
            args=" {}".format(" ".join(passthrough_args)) if passthrough_args else "",
        )
    )
    sys.argv = [str(fp)] + passthrough_args
    spec.loader.exec_module(module)


main()
