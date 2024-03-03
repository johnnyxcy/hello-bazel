#include "libcalc/math/math.hpp"

#include <iostream>

int main() {

  double val = calc::math::arithmetic::add(1, 2);

  std::cout << "1 + 2 = " << val << std::endl;
  return 0;
}