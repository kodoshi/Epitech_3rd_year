#ifndef CONNECTION_HPP
#define CONNECTION_HPP

#include <QLibraryInfo>
#include <QMessageBox>
#include <QInputDialog>
#include <QApplication>
#include <QTranslator>
#include <QLocale>
#include <QFile>
#include <iostream>

class ConnectionCode : public QWidget
{
	Q_OBJECT

public:
	ConnectionCode(QWidget *parent = nullptr);
	~ConnectionCode();
	QString EnterInformation();

protected:
};

#endif
