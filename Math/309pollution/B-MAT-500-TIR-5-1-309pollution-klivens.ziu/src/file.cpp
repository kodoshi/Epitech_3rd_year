#include "main.hpp"
#include "extra.hpp"

bool is_empty_file(std::ifstream &pFile)
{
    return pFile.peek() == std::ifstream::traits_type::eof();
}

bool line_parser(std::string str, int coords[50][50]) //placeholder 50
{
    std::string temp = "";
    std::string semic = ";";
    int buffer = 0;
    size_t position = 0;
    int holder[2];

    while ((position = str.find(semic)) != std::string::npos)
    {
        temp = str.substr(0, position);
        if (!is_digit(temp) || temp.empty())
        {
            std::cout << "Non-number found." << std::endl;
            return false;
        }
        holder[buffer] = std::stoi(temp);
        buffer++;
        str = str.substr(position + 1);
    }
    if (buffer != 2 || !is_digit(str))
    {
        std::cout << "Smth went wrong." << std::endl;
        return false;
    }
    coords[holder[0]][holder[1]] = std::stoi(str);
    return true;
}

bool file_parser(const std::string &holder, int coords[50][50])
{
    std::ifstream my_file(holder);
    std::string str;

    if (!my_file || is_empty_file(my_file))
    {
        std::cout << "File is empty or unopened." << std::endl;
        return false;
    }
    while (getline(my_file, str))
    {
        if (!line_parser(str, coords))
        {
            return false;
        }
    }
    return true;
}