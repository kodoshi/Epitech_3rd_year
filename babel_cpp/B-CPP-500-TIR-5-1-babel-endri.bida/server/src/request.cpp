#include "request.hpp"
using namespace std;

Request::~Request()
{
}

string Request::analyse()
{
}

string Request::connect()
{
    return ("LOGIN\r\n");
}