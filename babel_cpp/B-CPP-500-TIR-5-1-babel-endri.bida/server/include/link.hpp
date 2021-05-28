#ifndef LINK_HPP
#define LINK_HPP

#include "request.hpp"
#include "user.hpp"
#include "library.hpp"

#include <boost/asio.hpp>
#include <boost/array.hpp>
#include <boost/noncopyable.hpp>
#include <boost/shared_ptr.hpp>
#include <boost/enable_shared_from_this.hpp>
#include <iostream>
#include <boost/asio/buffer.hpp>
#include <vector>
#include <boost/bind.hpp>
#include <boost/format.hpp>
#include <sstream>
#include <string>
#include <array>

class controller;

class Connection
    : public boost::enable_shared_from_this<Connection>,
      private boost::noncopyable
{
public:
    Connection(boost::asio::io_service &io_service,
               controller &manager);

    boost::asio::ip::tcp::socket &socket();
    void read();
    void write(std::string msg);
    void start(library *_library);
    void stop();
    int check_log();
    void catch_log();
    void reading_analytics();
    void getCmd();
    void sendUserList(void);
    int catch_login();
    int catch_port();

protected:
    void handle_read(const boost::system::error_code &e,
                     std::size_t bytes_transferred);

    void handle_write(const boost::system::error_code &e);

    boost::asio::ip::tcp::socket _Socket;
    boost::array<char, 8192> _Buffer;
    boost::asio::ip::tcp::socket _Tcp_socket;

    controller &_controller;
    Request _Manager;
    std::pair<std::string, bool> _Log;
    std::pair<std::string, bool> _Port;
    std::string _Reply;
    library *_library;
    int _Connect;
    std::pair<std::string, std::string> _Cmd;
};

typedef boost::shared_ptr<Connection> _Connection_ptr;

#endif