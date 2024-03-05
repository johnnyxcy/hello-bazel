#include <iostream>

#include "libcalc/libcalc.hpp"

int main() {
  double val = calc::math::arithmetic::add(1, 2);

  std::cout << "1 + 2 = " << val << std::endl;
  return 0;
}