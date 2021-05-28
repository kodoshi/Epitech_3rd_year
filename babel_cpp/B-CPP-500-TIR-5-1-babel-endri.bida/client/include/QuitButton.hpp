#ifndef CREATEBUTTON_HPP
#define CREATEBUTTON_HPP

#include <vector>
#include <iostream>
#include <QApplication>
#include <QPushButton>
#include <QWidget>
#include <QFont>
#include <QIcon>
#include <QObject>
#include "clientconnect.hpp"

class QuitButton : public QPushButton
{
	Q_OBJECT

public:
	QuitButton(int, int, Client *, QWidget *parent = 0);
	~QuitButton();

protected:
	Client *_client;

public slots:
	void logout();
};

#endif
