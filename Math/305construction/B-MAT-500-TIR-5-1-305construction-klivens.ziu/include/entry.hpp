#ifndef ENTRY_HPP
#define ENTRY_HPP

#include "main.hpp"

class Entry
{
public:
    Entry();
    ~Entry();

    bool operator<(const Entry &other) const //sort by depth, and if its equal sort by duration
    {
        if (depth_level == other.depth_level)
        {
            return duration < other.duration;
        }
        return depth_level < other.depth_level;
    }
    std::string name;
    int depth_level;
    std::vector<std::string> dependencies;
    int duration;
    int start_time;
    int alt_start_time = 0; //0 by default
};
#endif