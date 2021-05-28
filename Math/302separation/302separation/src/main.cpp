#include "parser.hpp"

using namespace std;

int main(int argc, char *argv[])
{
    string help = "-h";
    if (argc == 1 || argc > 4)
    {
        cout << "Bad CLI arguments." << endl;
        exit(84);
    }
    if (argv[1] == help)
    {
        cout << "USAGE\n"
             << "    ./302separation file [n | p1 p2]\n"
             << "DESCRIPTION\n"
             << "    file    file that contains the list of Facebook connections\n"
             << "    n       maximum length of the paths\n"
             << "    pi      name of someone in the file" << endl;
        exit(84);
    }
    //check if argv[] values are what they should be? check if integer is an actual integer etc.
    //ask Theo about the correct regex in parser.cpp, and what type of error range we need to check
    ifstream file;
    string str;
    vector<string> holder_array;

    file.open(argv[1], ios::in);
    if (file.is_open())
    {
        while (getline(file, str))
        {
            holder_array.push_back(str);
        }
    }
    else
    {
        //cout << "File couldn't be opened." << endl;
        exit(84);
    }
    if (argc == 3)
    {
        string empty = "";
        name_separator(holder_array, 1, atoi(argv[2]), empty, empty);
    }
    else if (argc == 4) //&& isalpha(&argv[2][0]) && isalpha(&argv[3][0])
    {
        name_separator(holder_array, 2, INF, string(argv[2]), string(argv[3]));
    }
    else
    {
        cout << "Smth went wrong" << endl;
        exit(84);
    }
    return 0;
}