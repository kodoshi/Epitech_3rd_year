// Require libraries
const mysql = require("mysql");

// Database initialization
const config = {
    user: process.env.MYSQL_USER || "dashboard",
    password: process.env.MYSQL_PASSWORD || "dashboardpassword",
    database: process.env.MYSQL_DATABASE || "dashboard",
    host: process.env.MYSQL_HOST || "127.0.0.1",
};
let connection = mysql.createConnection(config);

// Middleware to active database in a route
function middleware(req, res, next) {
    if (connection.state === "authenticated") {
        req.my_db = connection;
        next();
    } else {
        res.status(500);
        res.json({error: "internal server error: not connected to database"});
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function resetConnection() {
    connection = mysql.createConnection(config)
}

function pingDatabase() {
    connection.ping();
}

function connect(callback) {
    connection.connect(async function(err) {
        if (err) {
            console.log("Could not connect to database, retrying in 3 seconds");
            await sleep(3000);
            await resetConnection();
            connect(callback);
        } else {
            let interval = setInterval(pingDatabase, 10000);
            connection.on('error', async function(err) {
                if(err.fatal === true) {
                    console.log("Connection to database lost");
                    clearInterval(interval);
                    await resetConnection();
                    connect(null);
                }
            });
            if (callback !== null) {
                callback(connection);
            }
            console.log("Connection to database succeeded");
        }
    });
}

module.exports = {
    middleware: middleware,
    connect: connect
};
