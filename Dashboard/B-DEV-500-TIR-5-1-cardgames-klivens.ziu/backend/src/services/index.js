const services = [
    require('./epitech'),
    require('./weather'),
    require('./news'),
    require('./twitter')
];

let aboutJson = [];
let aboutCompleteJson = [];
for (const service of services) {
    let widgets = [];
    let widgetsComplete = [];
    for (const widget of service.widgets) {
        widgets.push({name: widget.name, description: widget.description, params: widget.params});
        widgetsComplete.push({name: widget.name, display_name: widget.display_name, description: widget.description, params: widget.params});
    }
    aboutJson.push({name: service.name, widgets});
    aboutCompleteJson.push({name: service.name, display_name: service.display_name, need_oauth: service.need_oauth, widgets: widgetsComplete});
}

function getCallBackWidgetsList(db, userId, service, widget, callback) {
    return function(list) {
        db.query("SELECT id FROM widget_" + service + "_" + widget + " WHERE user_id = ? ", userId,
            (err, results) => {
                if (err === null && results.length > 0) {
                    for (const element of results) {
                        list.push({
                            service: service,
                            widget: widget,
                            id: element.id
                        });
                    }
                }
                callback(list);
            });
    };
}

function getWidgetsFromUser(db, userId, callback) {
    let to_call = callback;
    for (const service of services) {
        for (const widget of service.widgets) {
            to_call = getCallBackWidgetsList(db, userId, service.name, widget.name, to_call);
        }
    }
    to_call([]);
}

function getWidget(serviceName, widgetName) {
    for (const service of services) {
        if (service.name !== serviceName) {
            continue;
        }
        for (const widget of service.widgets) {
            if (widget.name === widgetName) {
                return widget;
            }
        }
    }
    return null;
}

function verifParams(params, bodyParams) {
    for (const param of params) {
        if (bodyParams.hasOwnProperty(param.name) === false) {
            return "missing parameter " + param.name;
        } else if (typeof bodyParams[param.name] !== param.type) {
            return "invalid parameter type " + param.name + ": " + typeof bodyParams[param.name] + " expected " + param.type;
        } else if (typeof bodyParams[param.name] === "string" && bodyParams[param.name].length > 255 || bodyParams[param.name].length === 0) {
            return "to much or not enough character in parameter " + param.name;
        } else if (typeof bodyParams[param.name] === "number" && ((param.hasOwnProperty("min") && bodyParams[param.name] < param.min) || (param.hasOwnProperty("max") && bodyParams[param.name] > param.max))) {
            return "invalid range of number for " + param.name;
        }
    }
    return null;
}

function createWidgetInDb(db, userId, service, widget, params, body, callback) {
    let sqlStr = "INSERT INTO widget_" + service + "_" + widget + " (user_id";
    let insertedValues = "";
    let parameters = [userId];
    for (const param of params) {
        sqlStr += ", " + param.name;
        parameters.push(body[param.name]);
        insertedValues += ", ? ";
    }
    sqlStr += ") VALUES ( ? " + insertedValues +")";
    db.query(sqlStr, parameters, (err, results) => {
        if (err !== null) {
            console.log(err);
            callback(500, {error: "internal server error"});
        } else {
            callback(200, {id: results.insertId});
        }
    });
}

function createWidget(db, userId, service, widget, bodyParams, callback) {
    let wid = getWidget(service, widget);
    if (wid === null) {
        callback(400, {error: "bad service and/or widget name"});
        return;
    }
    let err = verifParams(wid.params, bodyParams);
    if (err !== null) {
        callback(400, {error: err});
    } else {
        createWidgetInDb(db, userId, service, widget, wid.params, bodyParams, callback);
    }
}

function getWidgetInDb(db, service, widget, params, id, userId, callback) {
    let sqlStr = "SELECT ";
    let i = 0;
    for (const param of params) {
        if (i !== 0) {
            sqlStr += ", ";
        }
        sqlStr += param.name;
        i++;
    }
    sqlStr += " FROM widget_" + service + "_" + widget + " WHERE id = ? AND user_id = ?";
    db.query(sqlStr, [id, userId], callback);
}

const unknownWidget = "<div> This widget does not exist </div>";

function displayWidget(db, service, widget, id, userId, callback) {
    let wid = getWidget(service, widget);
    if (wid === null) {
        callback(200, {}, {}, unknownWidget);
    } else {
        getWidgetInDb(db, service, widget, wid.params, id, userId, (err, results) => {
            if (err !== null || results.length !== 1) {
                callback(200, {}, {}, unknownWidget);
            } else {
                wid.displayWidget(db, userId, results[0], callback);
            }
        });
    }
}

function modifWidgetInDb(db, userId, service, widget, widgetId, params, body, callback) {
    let sqlStr = "UPDATE widget_" + service + "_" + widget + " SET ";
    let parameters = [];
    let first = true;
    for (const param of params) {
        if (first) {
            first = false;
        } else {
            sqlStr += " , ";
        }
        sqlStr += param.name + " = ?";
        parameters.push(body[param.name]);
    }
    sqlStr += " WHERE id = ? AND user_id = ?";
    parameters.push(widgetId);
    parameters.push(userId);
    db.query(sqlStr, parameters, (err, results) => {
        if (err !== null) {
            console.log("modif widget error", err);
            callback(500, {error: "internal server error"});
        } else if (results.affectedRows === 0) {
            callback(400, {error: "this widget does not exist"});
        } else {
            callback(200, {message: "ok"});
        }
    });
}

function modifWidget(db, service, widget, widgetId, bodyParams, userId, callback) {
    let wid = getWidget(service, widget);
    if (wid === null) {
        callback(400, {error: "bad service and/or widget name"});
        return;
    }
    let err = verifParams(wid.params, bodyParams);
    if (err !== null) {
        callback(400, {error: err});
    } else {
        modifWidgetInDb(db, userId, service, widget, widgetId, wid.params, bodyParams, callback);
    }
}

function deleteWidget(db, service, widget, id, userId, callback) {
    db.query("DELETE FROM widget_" + service + "_" + widget + " WHERE id = ? AND user_id = ? ", [id, userId], (err, results) => {
        if (err !== null) {
            console.log(err);
            callback(200, {message: "ok"});
        } else {
            callback(200, {message: "ok"});
        }
    })
}

function getCallBackCreateTable(db, service, widget, params, callback) {
    let paramsFields = "";
    for (const param of params) {
        paramsFields += param.name + " ";
        if (param.type === "number") {
            paramsFields += "INTEGER";
        } else {
            paramsFields += "VARCHAR(256)";
        }
        paramsFields += " NOT NULL, "
    }
    return function() {
        db.query("CREATE TABLE IF NOT EXISTS widget_" + service + "_" + widget + " ( " +
            "id         INTEGER      NOT NULL AUTO_INCREMENT, " +
            "user_id    INTEGER      NOT NULL, " +
            paramsFields +
            "CONSTRAINT PRIMARY KEY (id), " +
            "FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ) ",
            (err) => {
                if (err !== null) {
                    console.log(err);
                }
                callback();
            });
    };
}

function createTables(db) {
    let to_call = () => {};
    for (let service of services) {
        for (let widget of service.widgets) {
            to_call = getCallBackCreateTable(db, service.name, widget.name, widget.params, to_call);
        }
    }
    to_call();
}

function getCallbackNumberWidget(db, service, widget, userId, callback)
{
    return (nbr) => {
        db.query("SELECT COUNT(*) AS total FROM widget_" + service + "_" + widget + " WHERE user_id = ? ", userId, (err, results) => {
            if (err === null) {
                callback(nbr + results[0].total);
            } else {
                callback(nbr);
            }
        })
    };
}

function getCallBackOauth(db, service, userId, callback)
{
    return (nbr, oauths) => {
        service.getOauthStatus(db, userId, (status) => {
            status.service = service.name;
            oauths.push(status);
            callback(nbr, oauths);
        })
    };
}

function getAccountInfos(db, userId, callback) {
    let to_call = function(nbrWidgets) {
        let to_call2 = callback;
        for (let service of services) {
            if (service.need_oauth) {
                to_call2 = getCallBackOauth(db, service, userId, to_call2);
            }
        }
        to_call2(nbrWidgets, []);
    };
    for (let service of services) {
        for (let widget of service.widgets) {
            to_call = getCallbackNumberWidget(db, service.name, widget.name, userId, to_call);
        }
    }
    to_call(0);
}

function addOauth(db, userId, serviceName, body, callback) {
    for (const service of services) {
        if (service.name === serviceName) {
            if (service.need_oauth === false) {
                callback(400, {error: "no oauth on this service"});
                return;
            } else {
                service.addOauth(db, userId, body, callback);
                return;
            }
        }
    }
    callback(400, {error: "service does not exist"})
}

function deleteOauth(db, userId, service, callback) {
    db.query("DELETE FROM oauth_" + service + " WHERE user_id = ? ", userId, (err, results) => {
        if (err !== null)
            console.log(err);
        callback(200, {message: "ok"});
    })
}

module.exports = {
    aboutJson: aboutJson,
    aboutCompleteJson: aboutCompleteJson,
    getAccountInfos: getAccountInfos,
    getWidgetsFromUser: getWidgetsFromUser,
    createWidget: createWidget,
    displayWidget: displayWidget,
    modifWidget: modifWidget,
    deleteWidget: deleteWidget,
    createTables: createTables,
    addOauth: addOauth,
    deleteOauth: deleteOauth
};