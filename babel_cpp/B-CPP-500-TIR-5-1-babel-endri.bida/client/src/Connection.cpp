#include "client/include/Connection.hpp"

ConnectionCode::ConnectionCode(QWidget *parent) : QWidget(parent)
{
}

QString ConnectionCode::EnterInformation()
{
	bool ok = false;
	QString pseudo = QInputDialog::getText(this, "Pseudonym", "What is your nickname ?", QLineEdit::Normal, QString(), &ok);
	if (ok && !pseudo.isEmpty())
	{
		QMessageBox::information(this, "Pseudonym ", "Welcome !");
	}
	else
	{
		QMessageBox::critical(this, "Pseudonym", "Anonymous user ...");
	}
	return pseudo;
}

ConnectionCode::~ConnectionCode()
{
}