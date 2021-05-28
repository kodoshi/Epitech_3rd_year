#ifndef CUSTOMWIDGET_HPP
#define CUSTOMWIDGET_HPP
#include <QtWidgets/QWidget>
#include <QPainter>

class CustomWidget : public QWidget
{
	Q_OBJECT

public:
	explicit CustomWidget(QWidget *parent = nullptr);
	~CustomWidget();

protected:
	void paintEvent(QPaintEvent *event);
};

#endif
