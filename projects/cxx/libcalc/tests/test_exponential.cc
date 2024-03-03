#include <gtest/gtest.h>

#include "libcalc/math/math.hpp"

TEST(TestExponential, TestExp) {
  using namespace calc::math;

  EXPECT_DOUBLE_EQ(exponential::exp<double>(1), std::exp(1));
  EXPECT_DOUBLE_EQ(exponential::exp<double>(2), std::exp(2));
}
