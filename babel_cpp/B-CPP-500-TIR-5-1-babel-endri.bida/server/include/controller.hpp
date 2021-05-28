#ifndef CONTROLLER_HPP
#define CONTROLLER_HPP

#include "link.hpp"
#include "library.hpp"
#include <set>

class controller
{
public:
    controller();
    void start(_Connection_ptr);
    void stop(_Connection_ptr);
    void stop_all();

private:
    std::set<_Connection_ptr> _Connections;
    library _library;
};

#endif