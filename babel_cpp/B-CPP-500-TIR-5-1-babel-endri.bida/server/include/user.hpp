#ifndef USER_HPP_
#define USER_HPP_

#include <iostream>

class user
{
private:
    std::string _Name;
    std::string _Ip;
    std::string _Port;

public:
    user();
    user(std::string, std::string, std::string);
    ~user();
    void setName(const std::string name);
    void setIp(const std::string ip);
    void setPort(const std::string port);
    std::string getName(void);
    std::string getIp(void);
    std::string getPort(void);
    bool isEmpty(void);
};

#endif