#ifndef EXTRA_HPP
#define EXTRA_HPP
#include "main.hpp"

bool is_empty_file(std::ifstream &pFile);
bool file_parser(const std::string &holder, int coords[50][50]); //placeholder 50
bool line_parser(std::string str, int coords[50][50]);           //placeholder 50

bool total_solve(int num, const std::string &file, double x, double y);

#endif