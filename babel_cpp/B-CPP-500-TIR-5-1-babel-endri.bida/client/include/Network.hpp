#ifndef NETWORK_HPP
#define NETWORK_HPP

#include <QObject>
#include <QtNetwork>
#include <QTcpSocket>
#include <QHostAddress>
#include <QWidget>

class TCPClient : public QWidget
{
	Q_OBJECT
public:
	TCPClient();

private:
signals:
private slots:
};

#endif
