#ifndef GHOST_HPP
#define GHOST_HPP

#include <vector>
#include <utility>
#include <ctype.h>

class Ghost
{
public:
    Ghost();
    ~Ghost();

    void find_pacman(std::vector<std::vector<char>> &map_array);
    int check_previous(std::pair<int, int> current_coords, std::vector<std::vector<std::pair<int, int>>> &previous_node);
    int safe_range_Y(int check);
    int safe_range_X(int check);

    char wall;
    int Y_dimension, X_dimension;
    int pacman_y_coord = -1, pacman_x_coord = -1;
    int ghost_y_coord = -1, ghost_x_coord = -1;
};
#endif