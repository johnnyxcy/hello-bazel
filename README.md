# Hello Bazel

This is a simple example of a Bazel project with Multi-language support.

1. Node.js
   - TypeScript
   - Electron
   - Vite/Vitest
   - ESM
   - Pnpm Monorepo Setup
2. Python
   - Virtual Environment
   - Pybind11
   - Pytest
   - Poetry Lock
   - Ruff
3. C++
   - LLVM Toolchain
   - GTest
   - Pybind11 + Stubgen
   - Clangd Compile Commands

## Directory Structure

```
.
├── BUILD.bazel
├── MODULE.bazel
├── MODULE.bazel.lock
├── README.md
├── WORKSPACE.bazel
├── WORKSPACE.bzlmod
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── poetry.lock
├── projects
│   ├── cxx
│   │   ├── calculator
│   │   │   ├── BUILD.bazel
│   │   │   └── main.cc
│   │   ├── libcalc
│   │   │   ├── BUILD.bazel
│   │   │   ├── examples
│   │   │   │   ├── BUILD.bazel
│   │   │   │   ├── python
│   │   │   │   │   ├── BUILD.bazel
│   │   │   │   │   └── simple.py
│   │   │   │   └── simple.cc
│   │   │   ├── src
│   │   │   │   └── libcalc
│   │   │   │       ├── _libcalc.py.cc
│   │   │   │       ├── grammar
│   │   │   │       │   ├── grammar.hpp
│   │   │   │       │   ├── parser.hpp
│   │   │   │       │   └── token.hpp
│   │   │   │       ├── libcalc.hpp
│   │   │   │       └── math
│   │   │   │           ├── _math.py.hpp
│   │   │   │           ├── arithmetic.hpp
│   │   │   │           ├── exponential.hpp
│   │   │   │           ├── math.hpp
│   │   │   │           └── tensor.hpp
│   │   │   └── tests
│   │   │       ├── BUILD.bazel
│   │   │       ├── test_arthimetic.cc
│   │   │       └── test_exponential.cc
│   │   ├── libprint
│   │   │   ├── BUILD.bazel
│   │   │   └── src
│   │   │       └── libprint
│   │   │           └── _libprint.py.cc
│   │   └── sayhi
│   │       ├── BUILD.bazel
│   │       ├── include
│   │       │   └── sayhi
│   │       │       └── hello.h
│   │       └── src
│   │           └── sayhi
│   │               ├── hello.cc
│   │               └── main.cc
│   ├── js
│   │   ├── app
│   │   │   ├── BUILD.bazel
│   │   │   ├── README.md
│   │   │   ├── build
│   │   │   │   └── entitlements.mac.plist
│   │   │   ├── package.json
│   │   │   ├── src
│   │   │   │   ├── platform
│   │   │   │   │   ├── main.ts
│   │   │   │   │   └── preload.ts
│   │   │   │   └── workbench
│   │   │   │       ├── app.tsx
│   │   │   │       ├── index.html
│   │   │   │       ├── index.tsx
│   │   │   │       └── vite-env.d.ts
│   │   │   ├── static
│   │   │   │   └── node.svg
│   │   │   ├── tsconfig.json
│   │   │   ├── tsconfig.node.json
│   │   │   └── vite.config.mts
│   │   ├── hello
│   │   │   ├── BUILD.bazel
│   │   │   ├── README.md
│   │   │   ├── package.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   ├── say.ts
│   │   │   │   └── sayhi.test.ts
│   │   │   ├── tsconfig.json
│   │   │   ├── tsconfig.node.json
│   │   │   └── vite.config.mts
│   │   └── vite-electron-plugin
│   │       ├── BUILD.bazel
│   │       ├── package.json
│   │       ├── src
│   │       │   ├── electron-env.d.ts
│   │       │   ├── host.ts
│   │       │   ├── index.ts
│   │       │   ├── not-bundle.ts
│   │       │   ├── options.ts
│   │       │   ├── plugin.ts
│   │       │   ├── resolve-config.ts
│   │       │   ├── resolve-external.ts
│   │       │   └── server.ts
│   │       ├── tsconfig.eslint.json
│   │       ├── tsconfig.json
│   │       ├── tsconfig.node.json
│   │       └── vite.config.mts
│   └── python
│       ├── greet
│       │   ├── BUILD.bazel
│       │   ├── src
│       │   │   └── greet
│       │   │       ├── __init__.py
│       │   │       └── config
│       │   │           ├── __init__.py
│       │   │           └── common.py
│       │   └── tests
│       │       ├── BUILD.bazel
│       │       └── config
│       │           └── test_config.py
│       └── hello
│           ├── BUILD.bazel
│           └── main.py
├── pyproject.toml
├── stubs
├── tools
│   ├── BUILD.bazel
│   ├── artifacts
│   │   ├── BUILD.bazel
│   │   └── link_artifacts.py
│   ├── buildifier
│   │   └── BUILD.bazel
│   ├── conditions
│   │   └── BUILD.bazel
│   ├── format
│   │   └── BUILD.bazel
│   ├── lint
│   │   ├── BUILD.bazel
│   │   └── linters.bzl
│   ├── npm_module
│   │   ├── BUILD.bazel
│   │   ├── defs.bzl
│   │   └── npm_module.bzl
│   ├── poetry
│   │   ├── BUILD.bazel
│   │   ├── README.md
│   │   ├── lock.bzl
│   │   └── repositories.bzl
│   ├── pybind11
│   │   ├── BUILD.bazel
│   │   ├── defs.bzl
│   │   ├── pybind_extension.bzl
│   │   └── stubgen.py
│   ├── pytest
│   │   ├── BUILD.bazel
│   │   ├── pytest.py.tpl
│   │   └── pytest_main.bzl
│   ├── ruff
│   │   └── BUILD.bazel
│   └── venv
│       ├── BUILD.bazel
│       ├── build_venv.py
│       └── venv.bzl
└── vendor
    ├── BUILD.bazel
    ├── pybind11-BUILD.bazel
    ├── repository.bzl
    └── utils.bzl
```
