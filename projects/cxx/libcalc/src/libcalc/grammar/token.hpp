#pragma once

#include <string>

namespace calc::grammar::token {

class Token {
public:
  enum class Type {
    Number,
    Plus,
    Minus,
    Multiply,
    Divide,
    OpenParenthesis,
    CloseParenthesis,
  };

  Token(Type type, std::string value) : type_(type), value_(std::move(value)) {}

  Type type() const { return type_; }
  const std::string &value() const { return value_; }

private:
  Type type_;
  std::string value_;
};

} // namespace calc::grammar::token