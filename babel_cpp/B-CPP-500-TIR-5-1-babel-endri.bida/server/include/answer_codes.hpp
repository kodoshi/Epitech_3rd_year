#include <iostream>

class Command
{
public:
    ~Command();
    typedef enum Code
    {
        OK = 200,
        CREATED = 201,
        ACCEPTED = 202,
        NO_CONTENT = 204,
        BAD_REQUEST = 400,
        UNAUTHORIZED = 401,
        FORBIDEN = 403,
        NOT_FOUND = 404,
        INTERNAL_SERVER_ERROR = 500,
        SERVICE_UNAVAILABLE = 503,
    } Code;
    std::string get_answer_code(Code status);
};