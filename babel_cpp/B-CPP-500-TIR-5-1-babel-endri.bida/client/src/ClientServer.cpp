#include "client/include/ClientServer.hpp"

ClientServer::ClientServer(QWidget *parent) : QWidget(parent)
{
	stateServer = new QLabel;
	buttonQuitter = new QPushButton(tr("Quit"));
	connect(buttonQuitter, SIGNAL(clicked()), qApp, SLOT(quit()));
	QVBoxLayout *layout = new QVBoxLayout;

	layout->addWidget(stateServer);

	layout->addWidget(buttonQuitter);
	server = new QTcpServer(this);
	std::cout << "test" << std::endl;
	if (!server->listen(QHostAddress::Any, 50885))
	{
		std::cout << "Nope" << std::endl;
		stateServer->setText(
			tr("The server could not start. Reason :<br />") +
			server->errorString());
	}
	else
	{
		stateServer->setText(
			tr("The server was started on port <strong>") +
			QString::number(server->serverPort()) +
			tr("</strong>.<br />Users can now connect."));
		connect(server, SIGNAL(newConnection()), this,
				SLOT(newConnection()));
	}
	szMessage = 0;
	std::cout << "Bg" << std::endl;
}

void ClientServer::newConnection()
{
	QTcpSocket *newClient = server->nextPendingConnection();
	clients << newClient;
}