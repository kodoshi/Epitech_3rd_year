#ifndef CREATEWINDOW_HPP
#define CREATEWINDOW_HPP

#include "QuitButton.hpp"
#include "CustomWidget.hpp"
#include "Connection.hpp"
#include "ListUsers.hpp"
#include "AddUserButton.hpp"
#include "clientconnect.hpp"
#include "serverconnect.hpp"
#include "Caller.hpp"
#include <QApplication>
#include <QPushButton>
#include <QWidget>
#include <QFont>
#include <QIcon>
#include <QMainWindow>

#include <QObject>

class MainWindow : public QMainWindow
{
public:
	MainWindow(Client *, QWidget *parent = 0);
	~MainWindow();

private:
	AddUserButton *addUserButton;
	CustomWidget *customWidget;
	QuitButton *quitButton;
	QString newPseudo;
	Caller *call;
	ConnectionCode connect;
	CreateListUser *listUser;
};

#endif
