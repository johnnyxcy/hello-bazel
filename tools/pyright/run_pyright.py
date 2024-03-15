import argparse
import json
import os
import pathlib
import subprocess
import sys


def parse_args(args: list[str]):
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--report", type=pathlib.Path, help="Report errors to a given file"
    )
    parser.add_argument(
        "--fix-relpath",
        dest="fix_relpath",
        action="store_true",
        help="Fix the relative path of the errors",
        default=False,
    )
    parser.add_argument(
        "--pyright",
        metavar="PYRIGHT_EXECUTABLE",
        type=pathlib.Path,
        required=False,
        help="Path to the pyright executable",
    )
    parser.usage = (
        parser.format_usage()[7:].strip() + " [--] [pyright args ...]"
    )

    return parser.parse_args(args)


def main():
    argv = sys.argv[1:]

    try:
        # split argv with "--" to separate pyright args from script args
        passthrough_idx = argv.index("--")
    except ValueError:
        passthrough_idx = -1
        pyright_args = []

    if passthrough_idx >= 0:
        pyright_args = argv[(passthrough_idx + 1) :]
        argv = argv[:passthrough_idx]
    else:
        pyright_args = []

    options = parse_args(argv)
    if options.pyright:
        pyright = options.pyright.as_posix()
    else:
        pyright = "pyright"
    command = [pyright, *pyright_args]
    if options.report:
        command.extend(["--outputjson"])
        pipe = subprocess.PIPE
    else:
        pipe = None

    print("$", " ".join(command))
    p = subprocess.run(command, stdout=pipe, stderr=pipe)

    if pipe and options.report:
        output_json = p.stdout.decode("utf-8")
        pyright_out = json.loads(output_json)
        for diagnostic in pyright_out["generalDiagnostics"]:
            if options.fix_relpath:
                # fix to relative path
                diagnostic["file"] = os.path.relpath(
                    diagnostic["file"], os.getcwd()
                )
            if diagnostic["severity"] == "error":
                print(
                    "{file} - {severity}: {message} ({rule})".format(
                        **diagnostic
                    )
                )

        print(
            "{errorCount} errors, {warningCount} warnings, {informationCount} informations.\n{filesAnalyzed} files analyzed in {timeInSec}s.".format(
                **pyright_out["summary"]
            )
        )

        with open(options.report, mode="w", encoding="utf-8") as f:
            if pyright_out["summary"]["errorCount"] > 0:
                f.write(json.dumps(pyright_out, indent=2))
            else:
                # dont put anything in the report file if there are no errors
                f.write("")
        # sys.exit(p.returncode)
    else:
        sys.exit(p.returncode)


if __name__ == "__main__":
    working_dir = os.environ.get("BAZEL_BINDIR") or os.environ.get(
        "BUILD_WORKSPACE_DIRECTORY"
    )
    if working_dir:
        os.chdir(working_dir)
    main()
