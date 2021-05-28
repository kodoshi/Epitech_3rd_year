#ifndef REQUEST_HPP
#define REQUEST_HPP

#include "answer_codes.hpp"
#include <string>
#include <vector>
#include <iostream>

class Request
{
public:
    std::string analyse();
    std::string connect();
    ~Request();
    Command _Cmd;
};

#endif