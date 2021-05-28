#ifndef CALL_HPP
#define CALL_HPP

#include <iostream>
#include <QtWidgets/QPushButton>
#include <client/include/clientconnect.hpp>

class Caller : public QPushButton
{
	Q_OBJECT
public:
	Caller(int, int, QWidget *);
	~Caller();

public slots:
	void StartCall();

protected:
	Client *client;
	Client *request_call;
};

#endif
