#ifndef LIBRARY_HPP_
#define LIBRARY_HPP_

#include "user.hpp"
#include <vector>

class library
{
protected:
    std::vector<user> _UserList;

public:
    library();
    ~library();
    std::vector<user> getUserList(void);
    bool userExists(std::string);
    user getUser(std::string);
    void addUser(user);
    void editUser(user);
    void removeUser(std::string);
};

#endif