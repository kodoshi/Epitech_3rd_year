#ifndef LISTUSERS_HPP
#define LISTUSERS_HPP

#include <QLabel>
#include <QMainWindow>
#include <QApplication>
#include <QPushButton>
#include <QWidget>
#include <QFont>
#include <QIcon>
#include <QObject>
#include "CustomWidget.hpp"

class CreateListUser : public QLabel
{
public:
	CreateListUser(QString, QWidget *parent);
	~CreateListUser();
	void Adduser();
};

#endif
