import argparse
import logging
import os
import pathlib


def build_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--is-dir",
        dest="is_dir",
        action="store_true",
        help="If set, the source is a directory",
        default=False,
    )
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
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    hdl = logging.StreamHandler()
    hdl.setFormatter(formatter)
    logger.addHandler(hdl)
    if args.log:
        file_hdl = logging.FileHandler(args.log)
        file_hdl.setFormatter(formatter)
        logger.addHandler(file_hdl)
    workspace_root = os.environ.get(
        "__WORKSPACE_ROOT__", os.environ.get("BUILD_WORKSPACE_DIRECTORY", None)
    )
    if workspace_root:
        src: pathlib.Path = args.src
        dest: pathlib.Path = pathlib.Path(workspace_root) / args.dest

        logging.info(f"Linking {src} to {dest}")
        if args.is_dir:
            for src_file in src.rglob("*"):
                if src_file.is_file():
                    dest_file = dest / src_file.relative_to(src)
                    dest_file.parent.mkdir(parents=True, exist_ok=True)
                    logging.info(f"{src_file} -> {dest_file}")
                    if dest_file.is_symlink():
                        logging.info("Removing existing file")
                        dest_file.unlink()
                    os.symlink(src_file.resolve(), dest_file)
        else:
            if dest.is_symlink():
                logging.info("Removing existing file")
                dest.unlink()
            logging.info(f"{src} -> {dest}")
            os.symlink(src.resolve(), dest)
        logging.info("Done")
    else:
        logging.warning(
            "Environment Variable __WORKSPACE_ROOT__ or BUILD_WORKSPACE_DIRECTORY is not set. No action taken."
        )


if __name__ == "__main__":
    main()
