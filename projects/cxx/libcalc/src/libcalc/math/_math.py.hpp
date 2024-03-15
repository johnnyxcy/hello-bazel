#pragma once

#include <pybind11/eigen.h>
#include <pybind11/pybind11.h>

#include "libcalc/math/math.hpp"

namespace calc::math {

void add_submodule(pybind11::module_& parent) {
  pybind11::module_ math_submodule = parent.def_submodule("math", "libcalc math lib");
  math_submodule.def("add", [](int a, int b) { return calc::math::arithmetic::add<int>(a, b); });
  math_submodule.def("add", [](double a, double b) { return calc::math::arithmetic::add<double>(a, b); });
  math_submodule.def("add", [](Eigen::MatrixXd& m1, Eigen::MatrixXd& m2) {
    return calc::math::arithmetic::add<Eigen::MatrixXd>(m1, m2);
  });

  math_submodule.def("sub", [](int a, int b) { return calc::math::arithmetic::sub<int>(a, b); });
  math_submodule.def("sub", [](double a, double b) { return calc::math::arithmetic::sub<double>(a, b); });
};

}  // namespace calc::math
