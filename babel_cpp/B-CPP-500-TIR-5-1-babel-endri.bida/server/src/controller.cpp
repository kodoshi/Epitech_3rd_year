#include <algorithm>
#include <boost/bind.hpp>
#include "controller.hpp"
using namespace std;

controller::controller() : _library()
{
}

void controller::start(_Connection_ptr c)
{
    _Connections.insert(c);
    c->start(&_library);
    cout << "NEW CLIENT" << endl;
}

void controller::stop(_Connection_ptr c)
{
    _Connections.erase(c);
    c->stop();
    cout << "CLIENT HAS LEFT" << endl;
}

void controller::stop_all()
{
    cout << "controller stop_all" << endl;
    for_each(_Connections.begin(), _Connections.end(),
             boost::bind(&Connection::stop, _1));
    _Connections.clear();
}