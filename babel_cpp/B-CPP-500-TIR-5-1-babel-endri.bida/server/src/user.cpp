#include "user.hpp"
using namespace std;

user::user() : _Name(""), _Ip(""), _Port("")
{
}

user::user(string name, string ip, string port) : _Name(name), _Ip(ip), _Port(port)
{
}

user::~user()
{
}

void user::setName(const string name)
{
    _Name = name;
}

void user::setIp(const string ip)
{
    _Ip = ip;
}

void user::setPort(const string port)
{
    _Port = port;
}

string user::getName(void)
{
    return (_Name);
}

string user::getIp(void)
{
    return (_Ip);
}

string user::getPort(void)
{
    return (_Port);
}

bool user::isEmpty(void)
{
    if (_Name.compare("") == 0 && _Ip.compare("") == 0 && _Port.compare("") == 0)
        return (true);
    return (false);
}