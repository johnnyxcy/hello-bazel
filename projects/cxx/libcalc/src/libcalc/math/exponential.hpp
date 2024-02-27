#pragma once

#include <cmath>

namespace libcalc::math::exponential {

template <typename T> T exp(T x) { return std::exp(x); }

template <typename T> T log(T x) { return std::log(x); }

template <typename T> T pow(T x, T y) { return std::pow(x, y); }

} // namespace libcalc::math::exponential