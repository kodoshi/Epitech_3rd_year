// Environment variables
const host = process.env.HOST || "8080";

// Require libraries
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Require modules
const db = require('./src/database');
const auth = require('./src/auth');
const widgets = require('./src/widgets');

// Creating server router
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    req.ipValid = req.headers['x-forwarded-for'] || req.ip.slice(7);
    if (req.ipValid.length === "")
        req.ipValid = "127.0.0.1";
    console.log("Received request: %s %s from %s", req.method, req.originalUrl, req.ipValid);
    next();
});

// API routes
app.post('/login', db.middleware, auth.loginHandler);
app.post('/register', db.middleware, auth.registerHandler);
app.get('/account', db.middleware, auth.middlewareStrict, widgets.accountHandler);
app.post('/change-password', db.middleware, auth.middlewareStrict, auth.passwordHandler);

app.get('/about.json', auth.middleware, widgets.aboutHandler);
app.get('/about-complete.json', auth.middleware, widgets.aboutCompleteHandler);

app.get('/widgets', db.middleware, auth.middlewareStrict, widgets.listHandler);
app.post('/widget', db.middleware, auth.middlewareStrict, widgets.createHandler);

app.get('/widget/:service/:widget/:id', db.middleware, auth.middlewareStrict, widgets.displayHandler);
app.patch('/widget/:service/:widget/:id', db.middleware, auth.middlewareStrict, widgets.modifHandler);
app.delete('/widget/:service/:widget/:id', db.middleware, auth.middlewareStrict, widgets.deleteHandler);

app.post('/oauth/:service', db.middleware, auth.middlewareStrict, widgets.addOauthHandler);
app.delete('/oauth/:service', db.middleware, auth.middlewareStrict, widgets.deleteOauthHandler);

// Invalid route management
app.use(function (req, res) {
    res.status(404);
    res.json({ error: "invalid route" });
});

// Launching database and server
db.connect(widgets.createTables);
app.listen(host, function () {
    console.log(`Starting dashboard backend on ${host}`);
});