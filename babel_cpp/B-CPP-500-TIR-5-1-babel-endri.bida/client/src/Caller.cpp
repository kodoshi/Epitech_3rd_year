#include <QtWidgets/QInputDialog>
#include <QtWidgets/QMessageBox>
#include "client/include/Caller.hpp"

Caller::Caller(int pos_x, int pos_y, QWidget *parent) : QPushButton(parent)
{
	setText("Call");
	move(pos_x, pos_y);
	setFont(QFont("Comic Sans MS", 20));
	setStyleSheet("background-color: grey; color : white;");
	connect(this, SIGNAL(pressed()), this, SLOT(StartCall()));
}

void Caller::StartCall()
{
	bool ok = false;
	QString tag = QInputDialog::getText(this, "Pseudonym", "IP ?", QLineEdit::Normal, QString(), &ok);
	if (ok && !tag.isEmpty())
	{
		QMessageBox::information(this, "Pseudonym ", "calling...");
	}
	client = new Client(CLIENT_CLIENT, tag, 4242);
	client->Connection();
	client->audio();
	std::cout << "calling.." << std::endl;
}

Caller::~Caller()
{
}