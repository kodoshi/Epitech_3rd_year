#ifndef SERVER_HPP
#define SERVER_HPP

#include "link.hpp"
#include "controller.hpp"

#include <iostream>
#include <boost/asio.hpp>
#include <string>

class Server
{
public:
    Server();
    void runService();

protected:
    std::string _Port;
    std::string _Addr;

    boost::asio::io_service _Io_service;
    boost::asio::signal_set _Signals;
    boost::asio::ip::tcp::acceptor _Acceptor;

    controller _controller;
    _Connection_ptr _New_connection;

    void start_accept();
    void handle_accept(const boost::system::error_code &e);
    void handle_stop();
    void runSignals();
    void runResolver();
};

#endif