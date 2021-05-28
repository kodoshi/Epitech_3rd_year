#include "display.hpp"

Display::Display()
{
}

Display::~Display()
{
}

std::string Display::unsuitable_content(int mode, std::string check) //the remaining 10% of error checking
{
    if (mode == 1) //means that string is expected
    {
        if (isdigit(check[0]))
        {
            std::cout << "Digit found in unsuitable position." << std::endl;
            exit(84);
        }
    }
    else if (mode == 2) //means that number is expected in string format
    {
        if (!isdigit(check[0]))
        {
            std::cout << "Alphabetical symbol found in unsuitable position." << std::endl;
            exit(84);
        }
    }
    return check;
}

void Display::sentence_parse(std::string sentence)
{
    size_t start;
    size_t end = 0;
    std::string irrelevant_desc;
    int index = 0;
    Entry my_entry;
    while ((start = sentence.find_first_not_of(";", end)) != std::string::npos)
    {
        end = sentence.find(";", start);
        switch (index)
        {
        case 0:
            my_entry.name = Display::unsuitable_content(1, sentence.substr(start, end - start));
            break;
        case 1:
            irrelevant_desc = sentence.substr(start, end - start);
            break;
        case 2:
            my_entry.duration = std::stoi(Display::unsuitable_content(2, sentence.substr(start, end - start)));
            break;
        }
        if (index >= 3)
        {
            my_entry.dependencies.push_back(Display::unsuitable_content(1, sentence.substr(start, end - start)));
        }
        index++;
    }
    if (index < 3)
    {
        std::cout << "Smth went wrong during section parsing." << std::endl;
        exit(84);
    }
    Display::display_array.push_back(my_entry);
}

void Display::print_all()
{
    std::cout << "Total duration of construction: " << Display::total_duration << " weeks\n\n";

    for (size_t i = 0; i < Display::display_array.size(); i++)
    {
        if (Display::display_array[i].alt_start_time == 0 || Display::display_array[i].alt_start_time == Display::display_array[i].start_time)
        {
            std::cout << Display::display_array[i].name << " must begin at t=" << Display::display_array[i].start_time << "\n";
        }
        else
        {
            std::cout << Display::display_array[i].name << " must begin between t=" << Display::display_array[i].start_time << " and t=" << Display::display_array[i].alt_start_time << "\n";
        }
    }
    std::cout << "\n";
    for (size_t j = 0; j < Display::display_array.size(); j++)
    {
        if (Display::display_array[j].alt_start_time == 0)
        {
            std::cout << Display::display_array[j].name << "\t(0)\t";
        }
        else
        {
            std::cout << Display::display_array[j].name << "\t(" << Display::display_array[j].alt_start_time - Display::display_array[j].start_time << ")\t";
        }
        if (j >= 1) //so we dont do it on the first element of the 2nd displayed list
        {
            for (int m = 0; m < Display::display_array[j].start_time; m++) //here we print the spaces before the '=' symbols
            {
                std::cout << " ";
            }
        }
        for (int n = 0; n < Display::display_array[j].duration; n++) //loop to print the '=' symbol
        {
            std::cout << "=";
        }
        std::cout << "\n";
    }
}

int Display::count_depth_recursively(std::string node_name, int count = 0)
{
    std::vector<std::string>::iterator it_name = std::find(Display::reference_name_list.begin(), Display::reference_name_list.end(), node_name);
    int node_index = std::distance(Display::reference_name_list.begin(), it_name);

    if (Display::display_array[node_index].dependencies.size() != 0)
    {
        count++;
        for (size_t i = 0; i < Display::display_array[node_index].dependencies.size(); i++)
        {
            Display::multiple_counts.push_back(Display::count_depth_recursively(Display::display_array[node_index].dependencies[i], count));
        }
        Display::display_array[Display::current_index].depth_level = *std::max_element(Display::multiple_counts.begin(), Display::multiple_counts.end());
    }
    return count;
}

void Display::final_parse_and_order(std::vector<std::string> &holder_array)
{
    //error checking first
    int semic_count;
    bool starter_already_set = false;
    for (size_t i = 0; i < holder_array.size(); i++)
    {
        semic_count = 0;
        for (size_t j = 0; j < holder_array[i].size(); j++)
        {
            if (holder_array[i][j] == ';')
            {
                semic_count++;
            }
        }
        if (holder_array[i][holder_array[i].size() - 1] == ';')
        {
            std::cout << "Semicolon at the end of the sentence with no follow-up characters found." << std::endl;
            exit(84);
        }
        if (semic_count < 2)
        {
            std::cout << "Not enough sections/semicolons found." << std::endl;
            exit(84);
        }
        else if (semic_count == 2 && !starter_already_set)
        {
            starter_already_set = true;
        }
        else if (semic_count == 2 && starter_already_set)
        {
            std::cout << "Starting sentence defined twice." << std::endl;
            exit(84);
        }
    }
    //error checking done 90%
    //actual parsing below
    for (size_t j = 0; j < holder_array.size(); j++)
    {
        Display::sentence_parse(holder_array[j]);
        Display::reference_name_list.push_back(Display::display_array[j].name);
    }

    for (size_t j = 0; j < Display::display_array.size(); j++)
    {
        Display::current_index = j;
        Display::count_depth_recursively(Display::display_array[j].name);
        Display::multiple_counts.clear();
    }
    for (size_t i = 0; i < Display::display_array.size(); i++)
    {
        if (Display::display_array[i].dependencies.size() == 0)
        {
            Display::display_array[i].depth_level = 0;
        }
    }

    std::sort(Display::display_array.begin(), Display::display_array.end()); //sorted by depth, if depth is the same between 2 elements, Entry with shorter duration comes first
    //now we define the start times
    int temp_level;
    Display::display_array[0].start_time = 0; //trivial
    for (size_t i = 1; i < Display::display_array.size(); i++)
    {
        //finding first occurrence in a depth_level below
        std::vector<int> time_collection;
        temp_level = Display::display_array[i].depth_level - 1;
        auto it = Display::display_array.begin();
        //lambda nameless functor
        while ((it = std::find_if(it, Display::display_array.end(), [&temp_level](const Entry &obj) { return obj.depth_level == temp_level; })) != Display::display_array.end())
        {
            auto it_index = std::distance(Display::display_array.begin(), it);
            //if current node is a predecessor to any
            if (std::find(Display::display_array[i].dependencies.begin(), Display::display_array[i].dependencies.end(), Display::display_array[it_index].name) != Display::display_array[i].dependencies.end())
            {
                time_collection.push_back(Display::display_array[it_index].start_time + Display::display_array[it_index].duration);
            }
            it++;
        }
        Display::display_array[i].start_time = *std::max_element(time_collection.begin(), time_collection.end());
    }
    //we search for all the Entries that have current node as predecessor,
    //sort these Entries by the earliest start date, that earliest date - current node duration = alt_start_date for current node
    for (size_t i = 1; i < Display::display_array.size(); i++)
    {
        std::vector<int> earliest_list;
        for (size_t j = 0; j < Display::display_array.size(); j++)
        {
            if ((std::find(Display::display_array[j].dependencies.begin(), Display::display_array[j].dependencies.end(), Display::display_array[i].name)) != Display::display_array[j].dependencies.end())
            {
                earliest_list.push_back(Display::display_array[j].start_time);
            }
        }
        if (!earliest_list.empty())
        {
            Display::display_array[i].alt_start_time = *std::min_element(earliest_list.begin(), earliest_list.end()) - Display::display_array[i].duration;
        }
        else
        {
            Display::display_array[i].alt_start_time = Display::display_array.back().start_time + Display::display_array.back().duration - Display::display_array[i].duration;
        }
        if (Display::display_array[i].alt_start_time <= Display::display_array[i].start_time)
        {
            Display::display_array[i].alt_start_time = 0;
        }
    }
    std::vector<int> highest_finish;
    for (size_t i = 0; i < Display::display_array.size(); i++)
    {
        highest_finish.push_back(Display::display_array[i].start_time + Display::display_array[i].duration);
    }
    Display::total_duration = *std::max_element(highest_finish.begin(), highest_finish.end());
}