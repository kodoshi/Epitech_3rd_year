#include <QDebug>
#include "client/include/ListUsers.hpp"

CreateListUser::CreateListUser(QString Pseudo, QWidget *parent) : QLabel(parent)
{
	QFont f("Arial", 30, QFont::Bold);
	setFont(f);
	qDebug() << Pseudo;
	setText("Welcome " + Pseudo);
}

void CreateListUser::Adduser()
{
}

CreateListUser::~CreateListUser()
{
}