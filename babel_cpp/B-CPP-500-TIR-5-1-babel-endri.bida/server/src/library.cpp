#include "controller.hpp"
#include "library.hpp"
#include "user.hpp"
using namespace std;

library::library()
{
}

library::~library()
{
}

vector<user> library::getUserList(void)
{
    return (_UserList);
}

void library::addUser(user usr)
{
    if (userExists(usr.getName()) == false)
        _UserList.push_back(usr);
}

void library::removeUser(string name)
{
    int i = 0;

    for (auto it = _UserList.begin(); it != _UserList.end(); it++)
    {
        if (it->getName().compare(name) == 0)
            break;
        i++;
    }
    _UserList.erase(_UserList.begin() + i);
}

bool library::userExists(string name)
{
    for (auto it = _UserList.begin(); it != _UserList.end(); it++)
    {
        if (it->getName().compare(name) == 0)
            return (true);
    }
    return (false);
}

user library::getUser(string name)
{
    for (auto it = _UserList.begin(); it != _UserList.end(); it++)
    {
        if (it->getName().compare(name) == 0)
            return (*it);
    }
    return (user("", "", ""));
}

void library::editUser(user usr)
{
    for (auto it = _UserList.begin(); it != _UserList.end(); it++)
    {
        if (it->getName().compare(usr.getName()) == 0)
        {
            it->setName(usr.getName());
            it->setIp(usr.getIp());
            it->setPort(usr.getPort());
        }
    }
}