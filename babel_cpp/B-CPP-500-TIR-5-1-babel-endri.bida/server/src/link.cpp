#include "link.hpp"
#include "controller.hpp"
using namespace std;

Connection::Connection(boost::asio::io_service &io_service,
                       controller &manager) : _Socket(io_service), _controller(manager), _Tcp_socket(io_service)
{
    _Log.first = "";
    _Log.second = false;
    _Port.first = "";
    _Port.second = false;
    _Connect = 0;
}

boost::asio::ip::tcp::socket &Connection::socket()
{
    return _Socket;
}

void Connection::start(library *_library)
{
    _library = _library;
    _Socket.async_read_some(boost::asio::buffer(_Buffer),
                            boost::bind(&Connection::handle_read, shared_from_this(),
                                        boost::asio::placeholders::error,
                                        boost::asio::placeholders::bytes_transferred));
    string welcome = "LOGIN ";
    string code = _Manager._Cmd.get_answer_code(Command::Code::OK);
    welcome += code;
    write(welcome);
    _Log.first = "";
    _Log.second = false;
    _Cmd.first = "";
    _Cmd.second = "";
}

int Connection::catch_login()
{
    if (_Cmd.second[0] == '\0')
    {
        string welcome = "LOGIN ";
        string code = _Manager._Cmd.get_answer_code(
            Command::Code::NO_CONTENT);
        welcome += code;
        _Reply = welcome;
        return (1);
    }
    else if (_library->userExists(_Cmd.second) == true)
    {
        cout << "User already exists" << endl;
        _Reply = _Manager._Cmd.get_answer_code(
            Command::Code::UNAUTHORIZED);
        return (1);
    }
    _Connect += 1;
    _Log.first = _Cmd.second;
    _Log.second = true;
    _Reply = _Manager._Cmd.get_answer_code(Command::Code::OK);
    return (0);
}

int Connection::catch_port()
{
    if (_Cmd.second[0] == '\0')
    {
        string welcome = "PORT ";
        string code = _Manager._Cmd.get_answer_code(
            Command::Code::NO_CONTENT);
        welcome += code;
        _Reply = welcome;
        return (1);
    }
    else
    {
        for (auto it = _Cmd.second.begin();
             it != _Cmd.second.end(); it++)
        {
            if (isdigit(*it) == false)
            {
                cout << "Port isn't digit" << endl;
                _Reply = _Manager._Cmd.get_answer_code(
                    Command::Code::UNAUTHORIZED);
                return (1);
            }
        }
    }
    _Connect += 1;
    _Port.first = _Cmd.second;
    _Port.second = true;
    _Reply = _Manager._Cmd.get_answer_code(Command::Code::OK);
    return (0);
}

void Connection::catch_log()
{
    string check = "";
    if (_Cmd.first.compare("LOGIN") == 0 && _Log.second == false)
    {
        if (catch_login() == 1)
            return;
    }
    else if (_Cmd.first.compare("PORT") == 0 && _Port.second == false)
    {
        if (catch_port() == 1)
            return;
    }
    else
        _Reply = _Manager._Cmd.get_answer_code(
            Command::Code::BAD_REQUEST);
}

int Connection::check_log()
{
    if (_Connect > 2)
        return (1);
    catch_log();
    if (_Log.second == true && _Port.second == true)
    {
        user usr(_Log.first,
                 _Socket.remote_endpoint().address().to_string(),
                 _Port.first);
        _library->addUser(usr);
        cout << "User logged in as " << _Log.first << " "
             << _Socket.remote_endpoint().address().to_string()
             << " " << _Port.first << endl;
        _Connect += 1;
        sendUserList();
    }
    return (0);
}

void Connection::getCmd()
{
    string text(_Buffer.begin(), _Buffer.end());
    istringstream iss(text);

    if (text.size() == 0)
        return;
    _Cmd.first.clear();
    _Cmd.second.clear();
    string tran("");
    iss >> tran;
    if (tran[0] != '\0')
        _Cmd.first = tran;
    tran = "";
    iss >> tran;
    if (tran[0] != '\0')
        _Cmd.second = tran;
}

void Connection::reading_analytics()
{
    if (_Cmd.first.compare("CALL") == 0)
    {
        string co;
        cout << "CALL_emp = " << _Cmd.second << endl;
        Command::Code _code;
        user usr;
        if (_library->userExists(_Cmd.second) == true &&
            (usr = _library->getUser(
                 _Cmd.second))
                .getName()
                .compare(_Log.first))
        {
            cout << "NAME-> " << usr.getName() << endl;
            cout << "IP-> " << usr.getIp() << endl;
            cout << "PORT-> " << usr.getPort() << endl;
            co =
                usr.getName() + " " + usr.getIp() + " " +
                usr.getPort() + "\n";
            _code = Command::Code::OK;
        }
        else
        {
            _code = Command::Code::NOT_FOUND;
            cout << "NOT FOUND" << endl;
            vector<user> userList = _library->getUserList();
            for (auto it = userList.begin();
                 it != userList.end(); it++)
                cout << it->getName() << endl;
        }
        co += _Manager._Cmd.get_answer_code(_code);
        _Reply = co;
    }
    else if (_Cmd.first.compare("LOG_OUT") == 0)
    {
        cout << "LOG OUT connect " << endl;
        _Reply = _Manager._Cmd.get_answer_code(Command::Code::OK);
    }
    else if (_Cmd.first.compare("LOG_OUT") > 0 &&
             _Cmd.first.compare("CALL") > 0)
        _Reply = _Manager._Cmd.get_answer_code(
            Command::Code::BAD_REQUEST);
}

void Connection::read()
{
    boost::asio::async_read(_Socket, boost::asio::buffer(_Buffer),
                            boost::asio::transfer_at_least(2),
                            boost::bind(&Connection::handle_read, shared_from_this(),
                                        boost::asio::placeholders::error,
                                        boost::asio::placeholders::bytes_transferred));
    getCmd();
}

void Connection::write(string msg)
{
    boost::asio::async_write(_Socket, boost::asio::buffer(msg),
                             boost::bind(&Connection::handle_write,
                                         shared_from_this(), // (2)
                                         boost::asio::placeholders::error));
    _Cmd.first = "";
    _Cmd.second = "";
    _Reply = "";
    for (int i = 0; i < 8192; i++)
        _Buffer[i] = 0;
}

void Connection::handle_read(const boost::system::error_code &e,
                             size_t bytes_transferred)
{
    if (!e || e == boost::asio::error::eof)
    {
        cout.write(&_Buffer[0], bytes_transferred);
        catch_log();
        read();
        if (check_log() == 1)
            reading_analytics();
        write(_Reply);
    }
    else
        _controller.stop(shared_from_this());
}

void Connection::handle_write(const boost::system::error_code &e)
{
    if (!e || e == boost::asio::error::eof)
        return;
    else
    {
        _controller.stop(shared_from_this());
        cout << "connection write stop " << endl;
    }
}

void Connection::stop()
{
    cout << "connection stop" << endl;
    _Socket.close();
    cout << "CLIENT HAS CLOSED" << endl;
}

void Connection::sendUserList(void)
{
    string msg("");
    string name("");
    string ip("");
    string port("");

    library rep = *_library;
    rep.removeUser(_Log.first);
    vector<user> userList = rep.getUserList();
    for (auto usr = userList.begin(); usr != userList.end(); usr++)
    {
        name = usr->getName();
        ip = usr->getIp();
        port = usr->getPort();
        msg += name + " " + ip + " " + port + " ";
    }
    msg += "\n";
    write(msg);
}