#include "libcalc/math/math.hpp"
#include <iostream>

int main() {
  double a = 3.0;
  double b = 2.0;
  std::cout << "a + b = " << libcalc::math::arithmetic::add(a, b) << std::endl;
  return 0;
}
