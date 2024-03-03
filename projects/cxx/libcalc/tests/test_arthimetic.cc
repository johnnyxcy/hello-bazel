#include <gtest/gtest.h>

#include <string>

#include "libcalc/math/math.hpp"

TEST(HelloTest, BasicAssertions) {
  // Expect two strings not to be equal.
  EXPECT_STRNE("hello", "world");
  // Expect equality.
  EXPECT_EQ(7 * 6, 42);
}

TEST(TestArithmetic, TestAdd) {
  using namespace calc::math;

  EXPECT_EQ(arithmetic::add(1, 2), 3);
  EXPECT_DOUBLE_EQ(arithmetic::add(1.1, 2.2), 3.3);
  EXPECT_EQ(arithmetic::add<std::string>("Hello", "World"), "HelloWorld");
}

TEST(TestArithmetic, TestSubtract) {
  using namespace calc::math;

  EXPECT_EQ(arithmetic::sub(2, 1), 1);
  EXPECT_DOUBLE_EQ(arithmetic::sub(2.2, 1.1), 1.1);
}

TEST(TestArithmetic, TestMultiply) {
  using namespace calc::math;

  EXPECT_EQ(arithmetic::mul(2, 3), 6);
  EXPECT_DOUBLE_EQ(arithmetic::mul(2.2, 3.3), 8);
}
