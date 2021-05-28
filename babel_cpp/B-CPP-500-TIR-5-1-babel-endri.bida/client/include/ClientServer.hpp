#ifndef CLIENTSERVER_HPP
#define CLIENTSERVER_HPP

#include <QtNetwork>
#include <QtWidgets/QWidget>
#include <QtNetwork/QTcpServer>
#include <QVBoxLayout>
#include <QtWidgets/QLabel>
#include <QPushButton>
#include <iostream>

class ClientServer : public QWidget
{
	Q_OBJECT

public:
	ClientServer(QWidget *parent = nullptr);

private slots:
	void newConnection();

private:
	QLabel *stateServer;
	QPushButton *buttonQuitter;

	QTcpServer *server;

	QList<QTcpSocket *> clients;

	quint16 szMessage;
};

#endif
