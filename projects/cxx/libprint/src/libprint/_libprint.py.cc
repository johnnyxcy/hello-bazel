#include <pybind11/pybind11.h>
#include <pybind11/stl.h>

#include <iostream>
#include <string>

PYBIND11_MODULE(_libprint, m) {
  m.def("hello_world", []() { std::cout << "Hello, World!" << std::endl; });
  m.def("cout", [](const std::string &s) { std::cout << s << std::endl; });
  m.def("cerr", [](const std::string &s) { std::cerr << s << std::endl; });
}
