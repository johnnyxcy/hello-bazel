#include <ctime>
#include <iostream>
#include <string>

#include "sayhi/hello.h"

std::string get_greet(const std::string &who) { return "Hello " + who; }

void print_localtime() {
  std::time_t result = std::time(nullptr);
  std::cout << std::asctime(std::localtime(&result));
}

int main(int argc, char **argv) {
  std::string who = "world";
  if (argc > 1) {
    who = argv[1];
  }
  std::cout << get_greet(who) << std::endl;
  say_hello(who);
  print_localtime();
  return 0;
}