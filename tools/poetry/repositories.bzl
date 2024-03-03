"""load poetry lock file"""

load("lock.bzl", _poetry_lock = "poetry_lock")

poetry_lock = _poetry_lock
