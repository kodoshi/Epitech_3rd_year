#include "map.hpp"

Map::Map()
{
}

Map::~Map()
{
}

void Map::change_symbols()
{
    for (size_t i = 0; i < Map::map_array.size(); i++)
    {
        for (size_t j = 0; j < Map::map_array[i].size(); j++)
        {
            if (Map::map_array[i][j] == '1')
            {
                Map::map_array[i][j] = Map::wall_symbol;
            }
            else if (Map::map_array[i][j] == '0')
            {
                Map::map_array[i][j] = Map::empty_symbol;
            }
        }
    }
}

void Map::print_map()
{
    for (size_t i = 0; i < Map::map_array.size(); i++)
    {
        for (size_t j = 0; j < Map::map_array[i].size(); j++)
        {
            std::cout << Map::map_array[i][j];
        }
        std::cout << "\n";
    }
}