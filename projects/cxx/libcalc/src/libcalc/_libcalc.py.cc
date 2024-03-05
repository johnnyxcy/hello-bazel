#include <pybind11/pybind11.h>

#include "libcalc/math/_math.py.hpp"

PYBIND11_MODULE(_libcalc, m) { calc::math::add_submodule(m); }
