#include "main.hpp"
#include "map.hpp"
#include "ghost.hpp"

using namespace std;

bool is_empty_file(std::ifstream &pFile)
{
    return pFile.peek() == std::ifstream::traits_type::eof();
}

int main(int argc, char *argv[])
{
    string help = "-h";
    if (argc == 1)
    {
        cout << "No arguments given." << endl;
        exit(84);
    }
    if (argv[1] == help)
    {
        cout << "USAGE\n"
             << "   ./304pacman file c1 c2\n"
             << "   file   file describing the board, using the following characters:\n"
             << "           ‘0’ for an empty square,\n"
             << "           ‘1’ for a wall,\n"
             << "           ‘F’ for the ghost’s position,\n"
             << "           ‘P’ for Pacman’s position.\n"
             << "   c1     character to display for a wall\n"
             << "   c2     character to display for an empty space." << endl;
        exit(84); //why not 84, who knows
    }

    else if (argc != 4 || strlen(argv[2]) != 1 || strlen(argv[3]) != 1 || argv[2][0] == argv[3][0]) //check if c1 or c2 are not 1-length chars
    {
        cout << "Bad arguments." << endl;
        exit(84);
    }

    ifstream file;
    string str;
    vector<string> holder_array;

    file.open(argv[1], ios::in); //file.open(argv[1], ios::in | ios::out);
    if (file.is_open())
    {
        if (is_empty_file(file))
        {
            cout << "The map file is empty." << endl;
            exit(84);
        }
        while (getline(file, str))
        {
            if (str.find_first_not_of("01FP") != std::string::npos)
            {
                cout << "Unknown symbols encountered." << endl;
                exit(84);
            }
            else
            {
                holder_array.push_back(str);
            }
        }
        /*
        file.clear();            //return buffer to the beginning of the file
        file.seekg(0, ios::beg); //return buffer to the beginning of the file
        file.close();
        */
    }
    else
    {
        cout << "File couldn't be opened." << endl;
        exit(84);
    }
    Map *my_map = new Map;
    Ghost *my_ghost = new Ghost;

    //writing map_array cells from holder_array string lines
    for (size_t i = 0; i < holder_array.size(); i++) //no special char checks for the moment, maybe not needed
    {
        vector<char> temp(holder_array[i].begin(), holder_array[i].end()); // string vector in holder_array turning into char vector
        my_map->map_array.push_back(temp);
    }
    my_map->wall_symbol = argv[2][0];  //storing new wall symbol
    my_map->empty_symbol = argv[3][0]; //storing new emptyspace symbol
    my_map->change_symbols();          //new map is stored inside the same instance

    my_ghost->wall = argv[2][0]; //storing new wall symbol in ghost instance

    my_ghost->find_pacman(my_map->map_array);
    my_map->print_map();

    return 0;
}