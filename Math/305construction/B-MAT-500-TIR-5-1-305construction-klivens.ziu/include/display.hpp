#ifndef DISPLAY_HPP
#define DISPLAY_HPP

#include "main.hpp"
#include "entry.hpp"

class Display
{
public:
    Display();
    ~Display();

    void final_parse_and_order(std::vector<std::string> &holder_array); //will fill display_array with ordered tasks
    void print_all();                                                   //will print to output when parsing and filling of display_array is done
    std::string unsuitable_content(int mode, std::string check);        //will check for numbers or strings in positions they shouldnt be
    void sentence_parse(std::string sentence);
    int count_depth_recursively(std::string node_name, int count);
    void shortest_length();

    std::vector<Entry> display_array;

    std::vector<std::string> reference_name_list; //stores all the names of the processes with the indexes they will have in display_array
    std::vector<int> multiple_counts;
    int total_duration = 0;
    int current_index;
};

#endif