#include "main.hpp"
#include "entry.hpp"
#include "display.hpp"

using namespace std;

bool is_file_empty(std::ifstream &pFile)
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

    if (argv[1] == help && argc == 2)
    {
        cout << "USAGE\n"
             << "   ./305construction file\n\n"
             << "DESCRIPTION\n"
             << "   file   file describing the tasks" << endl;
        exit(0);
    }
    else if (argc != 2)
    {
        cout << "Bad arguments." << endl;
        exit(84);
    }

    ifstream file;
    string str;
    vector<string> holder_array;

    file.open(argv[1], ios::in);
    if (file.is_open())
    {
        if (is_file_empty(file))
        {
            cout << "The given file is empty." << endl;
            exit(84);
        }
        while (getline(file, str))
        {
            //maybe more specific regex needed
            if (str.find_first_not_of("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz;123456789 ") != std::string::npos) //std::regex is lowkey dogshit
            {
                cout << "Unknown symbols encountered." << endl;
                exit(84);
            }
            else
            {
                holder_array.push_back(str);
            }
        }
    }
    else
    {
        cout << "File couldn't be opened." << endl;
        exit(84);
    }

    Display *my_display = new Display;
    my_display->final_parse_and_order(holder_array);
    my_display->print_all();
    return 0;
}