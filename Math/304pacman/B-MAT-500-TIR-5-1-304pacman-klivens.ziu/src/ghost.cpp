#include "ghost.hpp"
#include "main.hpp"

Ghost::Ghost()
{
}

Ghost::~Ghost()
{
}

int Ghost::check_previous(std::pair<int, int> current_coords, std::vector<std::vector<std::pair<int, int>>> &previous_node)
{
    //this func will keep searching and counting how many predecessor nodes it takes to arrive at the coordinates of the ghost,
    //it replaces current_coord to be checked, with its predecessor which was scanned in the previous iteration
    int count = 0;
    while (true)
    {
        if (current_coords != std::make_pair(Ghost::ghost_y_coord, Ghost::ghost_x_coord))
        {
            current_coords = previous_node[current_coords.first][current_coords.second];
            count++;
        }
        else //we arrived at the ghost_coord
        {
            return count;
        }
    }
}

int Ghost::safe_range_Y(int check) //if the value of coord we're trying to look for doesnt exist, we clamp it
{
    if (check <= 0)
    {
        return 0;
    }
    else if (check >= Ghost::Y_dimension)
    {
        return Ghost::Y_dimension;
    }
    else
    {
        return check;
    }
}

int Ghost::safe_range_X(int check) //if the value of coord we're trying to look for doesnt exist, we clamp it
{
    if (check <= 0)
    {
        return 0;
    }
    else if (check >= Ghost::X_dimension)
    {
        return Ghost::X_dimension;
    }
    else
    {
        return check;
    }
}

void Ghost::find_pacman(std::vector<std::vector<char>> &map_array)
{
    Ghost::Y_dimension = map_array.size() - 1;
    Ghost::X_dimension = map_array[0].size() - 1;

    for (int i = 0; i < int(map_array.size()); i++) //find the ghost coords first
    {
        if (map_array[i].size() != map_array[0].size())
        {
            std::cout << "Map has inconsistent dimensions." << std::endl;
            exit(84);
        }
        for (int j = 0; j < int(map_array[i].size()); j++)
        {
            if (map_array[i][j] == 'F')
            {
                Ghost::ghost_y_coord = i;
                Ghost::ghost_x_coord = j;
            }
            else if (map_array[i][j] == 'P')
            {
                Ghost::pacman_y_coord = i;
                Ghost::pacman_x_coord = j;
            }
        }
    }

    //lets see if the map has 'F' or 'P' symbols to begin with
    if (Ghost::ghost_y_coord == -1 || Ghost::ghost_x_coord == -1 || Ghost::pacman_y_coord == -1 || Ghost::pacman_x_coord == -1)
    {
        std::cout << "Ghost or Pacman symbol not found." << std::endl;
        exit(84);
    }
    //dijkstra part here
    std::vector<std::pair<int, int>> queue;                          //this list will hold the coordinates to be scanned (pair<Y, X>)
    bool visited[map_array.size()][map_array[0].size()] = {{false}}; //everything initialized as false, keeps track of what node is visited already
    //previous_node will hold every cells previous predecessor's coords in a pair (pair<Y, X>), this is the essence of dijkstra: tracking previous predecessors will give us shortest path from source to target
    std::vector<std::vector<std::pair<int, int>>> previous_node;

    std::vector<std::pair<int, int>> buffer;
    for (size_t k = 0; k < map_array.size(); k++) //previous_node gets zero initialized
    {
        for (size_t l = 0; l < map_array[0].size(); l++)
        {
            buffer.push_back(std::make_pair(0, 0));
        }
        previous_node.push_back(buffer);
    }

    queue.push_back(std::make_pair(ghost_y_coord, ghost_x_coord)); //origin point of search gets pushed to queue to get scanned

    while (!queue.empty()) //or while (true)
    {
        if (map_array[queue.front().first][queue.front().second] != 'P') //pacman still not found
        {
            visited[queue.front().first][queue.front().second] = true; //mark current coords as visited

            //decide if we're updating the map itself, check if current cell is not wall, pacman or ghost itself
            if (map_array[queue.front().first][queue.front().second] != Ghost::wall && map_array[queue.front().first][queue.front().second] != 'P' && map_array[queue.front().first][queue.front().second] != 'F')
            {
                map_array[queue.front().first][queue.front().second] = '0' + (Ghost::check_previous(queue.front(), previous_node) % 10);

                //if we had no walls, the implementation below would be enough
                //cartesian coord difference or manhattan distance between two points (p1, p2) and (q1, q2) is |p1 - q1| + |p2 - q2|
                //map_array[queue.front().first][queue.front().second] = '0' + ((abs(Ghost::ghost_y_coord - queue.front().first) + abs(Ghost::ghost_x_coord - queue.front().second)) % 10); //mod 10 needed here
            }

            //add the 4 adjacent elements into the bottom of the queue, in clockwise order: (North, East, South, West)
            //we also use safe_range() to make sure we dont go out of bounds and avoid accessing non-existing coords
            //check if coords are visited before push_back() in queue, we also check if its not a wall
            //also add the current queue.front() as the predecessor to these potential 4 new queue objects
            if (!visited[safe_range_Y(queue.front().first - 1)][safe_range_X(queue.front().second)] && map_array[safe_range_Y(queue.front().first - 1)][safe_range_X(queue.front().second)] != Ghost::wall)
            {
                queue.push_back(std::make_pair(safe_range_Y(queue.front().first - 1), safe_range_X(queue.front().second))); //North, we're going 1 Y unit up
                previous_node[safe_range_Y(queue.front().first - 1)][safe_range_X(queue.front().second)] = queue.front();   //save current queue.front() as the predecessor of the next cell interations
            }
            if (!visited[safe_range_Y(queue.front().first)][safe_range_X(queue.front().second + 1)] && map_array[safe_range_Y(queue.front().first)][safe_range_X(queue.front().second + 1)] != Ghost::wall)
            {
                queue.push_back(std::make_pair(safe_range_Y(queue.front().first), safe_range_X(queue.front().second + 1))); //East, we're going 1 X unit to the right
                previous_node[safe_range_Y(queue.front().first)][safe_range_X(queue.front().second + 1)] = queue.front();   //save current queue.front() as the predecessor of the next cell interations
            }
            if (!visited[safe_range_Y(queue.front().first + 1)][safe_range_X(queue.front().second)] && map_array[safe_range_Y(queue.front().first + 1)][safe_range_X(queue.front().second)] != Ghost::wall)
            {
                queue.push_back(std::make_pair(safe_range_Y(queue.front().first + 1), safe_range_X(queue.front().second))); //South, we're going 1 Y unit down
                previous_node[safe_range_Y(queue.front().first + 1)][safe_range_X(queue.front().second)] = queue.front();   //save current queue.front() as the predecessor of the next cell interations
            }
            if (!visited[safe_range_Y(queue.front().first)][safe_range_X(queue.front().second - 1)] && map_array[safe_range_Y(queue.front().first)][safe_range_X(queue.front().second - 1)] != Ghost::wall)
            {
                queue.push_back(std::make_pair(safe_range_Y(queue.front().first), safe_range_X(queue.front().second - 1))); //West, we're going 1 X unit to the left
                previous_node[safe_range_Y(queue.front().first)][safe_range_X(queue.front().second - 1)] = queue.front();   //save current queue.front() as the predecessor of the next cell interations
            }

            queue.erase(queue.begin()); //remove the top of the queue so next element can be scanned in the next iteration
        }
        else //pacman found
        {
            break;
        }
    }
}