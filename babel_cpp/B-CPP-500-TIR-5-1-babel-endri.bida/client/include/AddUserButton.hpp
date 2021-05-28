#ifndef ADDUSERBUTTON_H
#define ADDUSERBUTTON_H

#include <QtWidgets/QInputDialog>
#include <QtWidgets/QPushButton>
#include "serverconnect.hpp"
#include <iostream>
#include <QtWidgets/QMessageBox>
#include <QApplication>

class AddUserButton : public QPushButton
{
	Q_OBJECT
public:
	AddUserButton(int, int, QWidget *);
	~AddUserButton();

public slots:
	void EnterPseudo();

protected:
	ServerConnect *serverConnect;
	int state;

public:
	int getState() const;

	void setState(int state);
};

#endif
