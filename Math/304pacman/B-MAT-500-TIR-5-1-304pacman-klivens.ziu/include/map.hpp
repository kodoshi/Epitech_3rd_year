#ifndef MAP_HPP
#define MAP_HPP

#include <vector>
#include "main.hpp"

class Map
{
public:
    Map();
    ~Map();

    std::vector<std::vector<char>> map_array;
    char wall_symbol;
    char empty_symbol;

    void change_symbols();
    void print_map();
};
#endif