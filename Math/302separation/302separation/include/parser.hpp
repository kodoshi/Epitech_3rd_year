#ifndef PARSER_HPP_
#define PARSER_HPP_

#define INF 99999999 //very big number
#include <iostream>
#include <fstream>
#include <cstdlib>
#include <string>
#include <vector>
#include <stdlib.h>
#include <tuple>
#include <algorithm>
#include <utility>
#include <ctype.h>
#include <regex>

void name_separator(std::vector<std::string> holder_array, int mode, int max_connections, std::string a_name, std::string b_name);
bool v_comparator(const std::pair<std::string, std::string> &a, const std::pair<std::string, std::string> &b);
#endif