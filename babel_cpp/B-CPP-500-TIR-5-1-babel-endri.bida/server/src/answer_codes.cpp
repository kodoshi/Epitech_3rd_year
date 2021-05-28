#include "answer_codes.hpp"
using namespace std;

namespace answer_code
{
    const string ok = "200 OK\r\n";
    const string created = "201 Created\r\n";
    const string accepted = "202 Accepted\r\n";
    const string no_content = "204 No Content\r\n";

    const string bad_request = "400 Bad Request\r\n";
    const string unauthorized = "401 Unauthorized\r\n";
    const string not_found = "404 Not Found\r\n";

    const string internal_server_error = "500 Internal Server Error\r\n";
    const string service_unavailable = "503 Service Unavailable\r\n";
} // namespace answer_code
Command::~Command()
{
}
string Command::get_answer_code(Code status)
{
    switch (status)
    {
    case Command::Code::OK:
        return answer_code::ok;
    case Command::Code::CREATED:
        return answer_code::created;
    case Command::Code::ACCEPTED:
        return answer_code::accepted;
    case Command::Code::NO_CONTENT:
        return answer_code::no_content;
    case Command::Code::BAD_REQUEST:
        return answer_code::bad_request;
    case Command::Code::UNAUTHORIZED:
        return answer_code::unauthorized;
    case Command::Code::NOT_FOUND:
        return answer_code::not_found;
    case Command::Code::INTERNAL_SERVER_ERROR:
        return answer_code::internal_server_error;
    case Command::Code::SERVICE_UNAVAILABLE:
        return answer_code::service_unavailable;
    default:
        return answer_code::internal_server_error;
    }
}