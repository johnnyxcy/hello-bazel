#include "libcalc/math/math.hpp"
#include <iostream>

int main() {
  double a = 3.0;
  double b = 2.0;
  calc::math::tensor::a2d m;

  m.setRandom();

  calc::math::tensor::a2d m2 = m * m;

  std::cout << m2 << std::endl;
  std::cout << "a + b = " << calc::math::arithmetic::add(a, b) << std::endl;
  return 0;
}
