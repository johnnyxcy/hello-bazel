#include "sayhi/hello.h"

#include <iostream>

void say_hello(const std::string &who) {
  std::cout << "Hello " << who << std::endl;
}