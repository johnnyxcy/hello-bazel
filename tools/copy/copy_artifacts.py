import argparse
import logging
import os
import pathlib
import shutil


def build_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--src",
        type=pathlib.Path,
        required=True,
        help="Relative Path Only. Consider use $(rootpath)",
    )
    parser.add_argument(
        "--dest",
        type=pathlib.Path,
        required=True,
        help="Relative Path Only. Consider use $(rootpath)",
    )
    parser.add_argument(
        "--log",
        type=pathlib.Path,
        required=False,
        dest="log",
    )
    return parser


def main():
    args = build_parser().parse_args()

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    if args.log:
        logger.addHandler(logging.FileHandler(args.log))
    workspace_root = os.environ.get("__WORKSPACE_ROOT__", None)
    if workspace_root:
        src: pathlib.Path = args.src
        dest: pathlib.Path = args.dest

        if src.is_dir():
            shutil.copytree(src, dest, dirs_exist_ok=True)
            logging.info(f"Copy directory {src} to {dest}")
        else:
            shutil.copy2(src, dest, follow_symlinks=False)
            logging.info(f"Copy {src} to {dest}")
    else:
        logging.warn(
            "Environment Variable __WORKSPACE_ROOT__ is not set. No action taken."
        )


if __name__ == "__main__":
    main()
