const services = require('./services');

exports.aboutHandler = function (req, res) {
    res.status(200);
    res.json({
        customer: {
            host: req.ipValid
        },
        server: {
            current_time: Date.now(),
            services: services.aboutJson
        }
    });
};

exports.aboutCompleteHandler = function (req, res) {
    res.status(200);
    res.json({
        customer: {
            host: req.ipValid
        },
        server: {
            current_time: Date.now(),
            services: services.aboutCompleteJson
        }
    });
};

exports.accountHandler = function (req, res) {
    services.getAccountInfos(req.my_db, req.my_user_id, (nbr, oauth) => {
        res.status(200);
        res.json({
            id: req.my_user_id,
            username: req.my_username,
            widgets_count: nbr,
            oauth: oauth
        });
    });
};

exports.listHandler = function (req, res) {
    services.getWidgetsFromUser(
        req.my_db,
        req.my_user_id,
            list => {
            res.status(200);
            res.json(list);
    });
};

exports.createHandler = function (req, res) {
    if (req.body.hasOwnProperty("service") === false ||
        req.body.hasOwnProperty("widget") === false ||
        req.body.hasOwnProperty("params") === false) {
        res.status(400);
        res.json({error: "invalid request body"});
        return;
    }
    services.createWidget(
        req.my_db,
        req.my_user_id,
        req.body.service,
        req.body.widget,
        req.body.params,
        (status, body) => {
            res.status(status);
            res.json(body);
    });
};

exports.displayHandler = function (req, res) {
    services.displayWidget(
        req.my_db,
        req.params.service,
        req.params.widget,
        req.params.id,
        req.my_user_id,
        (status, params, current, html) => {
            res.status(status);
            res.json({
                params: params,
                current: current,
                html: html
            });
    });
};

exports.modifHandler = function(req, res) {
    services.modifWidget(
        req.my_db,
        req.params.service,
        req.params.widget,
        req.params.id,
        req.body,
        req.my_user_id,
        (status, body) => {
            res.status(status);
            res.json(body);
        });
};

exports.deleteHandler = function(req, res) {
    services.deleteWidget(
        req.my_db,
        req.params.service,
        req.params.widget,
        req.params.id,
        req.my_user_id,
        (status, body) => {
            res.status(status);
            res.json(body);
    });
};

exports.addOauthHandler = function(req, res) {
    services.addOauth(req.my_db, req.my_user_id, req.params.service, req.body, (status, body) => {
        res.status(status);
        res.json(body);
    });
};

exports.deleteOauthHandler = function(req, res) {
    services.deleteOauth(req.my_db, req.my_user_id, req.params.service, (status, body) => {
        res.status(status);
        res.json(body);
    });
};

exports.createTables = function(db) {
    services.createTables(db);
};