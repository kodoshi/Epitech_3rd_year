const config = require("./config/config.js");
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");

// Mongoose DB connection
mongoose.connect(process.env.DB_CFG, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
});

let db = mongoose.connection;

//Check connection
db.once("open", function () {
    console.log("Connection to MongoDB successful");
});

//Check DB errors
db.on("error", function (err) {
    console.log(err);
});

const authRoutes = require("./routes/auth"); //authentication routing
const userRoutes = require("./routes/user"); //user routing
const discordRoutes = require("./routes/discord");
const weatherRoutes = require("./routes/weather");
const redditRoutes = require("./routes/reddit");
const astronautRoutes = require("./routes/astronaut");
const jokeRoutes = require("./routes/joke");
const tradeRoutes = require("./routes/trade");
const norrisRoutes = require("./routes/norris");
//app.use("/api", express.static("docs/api_docs.json")); //API Routes Documentation
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation)); //API Routes Documentation v2

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json()); //express is depress-ion
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", discordRoutes);
app.use("/", weatherRoutes);
app.use("/", redditRoutes);
app.use("/", astronautRoutes);
app.use("/", jokeRoutes);
app.use("/", tradeRoutes);
app.use("/", norrisRoutes); //req.connection.remoteAddress req.ip
app.get('/about.json', (req, res) => {
    req;
    res.status(200).json({
        "client": {
            "host": req.connection.remoteAddress
        },
        "server": {
            "current_time": Date.now(),
            "services": [{
                "name": "discord",
                "actions": [{
                    "name": "action_new_message",
                    "description": " Notifies when new message is sent in a server "
                }, {
                    "name": "action_user_joins",
                    "description": " Notifies when new user joins the server "
                }, {
                    "name": "action_new_channel",
                    "description": " Notifies when a new channel is created "
                }, {
                    "name": "action_user_banned",
                    "description": " Notifies when a user is banned from server "
                }, {
                    "name": "action_user_kicked",
                    "description": " Notifies when a user is kicked from server "
                }],
                "reactions": [{
                    "name": "reaction_create_channel",
                    "description": "Created new text channel when triggered"
                }, {
                    "name": "reaction_create_voice_channel",
                    "description": "Created new voice channel when triggered"
                }, {
                    "name": "reaction_send_email",
                    "description": "Send an email to an address when triggered"
                }]
            }, {
                "name": "ISS API",
                "actions": [{
                    "name": "action_location",
                    "description": "Notifies of the lat,lng position of the International Space Station flight in real time"
                }, {
                    "name": "action_solar_location",
                    "description": "Notifies of the solar lat,lng position of the International Space Station flight in real time"
                }, {
                    "name": "action_other_stats",
                    "description": "Notifies of other stats of the International Space Station flight in real time"
                }],
                "reactions": [{
                    "name": "reaction_send_email",
                    "description": "Send an email to an address when triggered"
                }]
            }, {
                "name": "Forex API",
                "actions": [{
                    "name": "action_eur",
                    "description": "Fetches the Euro's standing against other coins"
                }],
                "reactions": [{
                    "name": "reaction_send_email",
                    "description": "Send an email to an address when triggered"
                }]
            }, {
                "name": "weather",
                "actions": [{
                    "name": "show_city_stats",
                    "description": "Displays the weather stats of whichever city chosen"
                }]
            }, {
                "name": "reddit",
                "actions": [{
                    "name": "show_subreddit",
                    "description": "Fetch a subreddit"
                }]
            }, {
                "name": "Chuck Norris API",
                "actions": [{
                    "name": "action_active",
                    "description": "Displays a random fact about Chuck Norris"
                }],
                "reactions": [{
                    "name": "reaction_send_email",
                    "description": "Send an email to an address when triggered"
                }]
            }, {
                "name": "Joke API",
                "actions": [{
                    "name": "action_french_joke",
                    "description": "Displays a random joke in french"
                }, {
                    "name": "action_english_joke",
                    "description": "Displays a random joke in english"
                }, {
                    "name": "action_programming_joke",
                    "description": "Displays a random joke about programming"
                }, {
                    "name": "action_christmas_joke",
                    "description": "Displays a random joke about christmas"
                },],
                "reactions": [{
                    "name": "reaction_send_email",
                    "description": "Send an email to an address when triggered"
                }]
            }]
        }
    });
});



//custom middleware to give cleaner missing auth error
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized" });
    }
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Node server active on port ${process.env.SERVER_PORT}`);
});
