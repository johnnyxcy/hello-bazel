#pragma once

#include <cmath>

namespace calc::math::exponential {

template <typename T> T exp(T x) { return std::exp(x); }

template <typename T> T log(T x) { return std::log(x); }

template <typename T> T pow(T x, T y) { return std::pow(x, y); }

template <typename T> T pow2(T x) { return std::pow(x, 2); }

template <typename T> T pow3(T x) { return std::pow(x, 3); }

} // namespace calc::math::exponential