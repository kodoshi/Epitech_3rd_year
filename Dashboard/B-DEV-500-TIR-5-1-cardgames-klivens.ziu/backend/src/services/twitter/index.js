const crypto = require('crypto');
const axios = require('axios');
const twitter = require('node-twitter-api');

// General informations
const name = "twitter";
const display_name = "Twitter";
const need_oauth = true;

let client = new twitter({
    consumerKey: process.env.API_KEY_TWITTER || "none",
    consumerSecret: process.env.API_KEY_SECRET_TWITTER || "none",
    callback: process.env.CALLBACK_TWITTER || 'http://localhost:3000/oauth/twitter'
});

function getCredentials(db, userId, callback) {
    db.query("SELECT oauth_token, oauth_token_secret, twitter_user_id, screen_name FROM oauth_twitter WHERE user_id = ? ",
        userId, (err, results) => {
        callback(err, results);
    })
}

function getAuthUrl(callback) {
    client.getRequestToken(function(error, requestToken){
        if (error) {
            callback(null);
        } else {
            callback("https://api.twitter.com/oauth/authorize?oauth_token=" + requestToken);
        }
    });
}

function getOauthStatus(db, userId, callback) {
    getCredentials(db, userId, (err, result) => {
        if (err !== null) {
            callback({status: -1});
        } else if (result.length === 0) {
            getAuthUrl(url => {
                if (url === null)
                    callback({status: -1});
                else
                    callback({status: 0, url: url});
            });
        } else {
            callback({status: 1});
        }
    })
}

function addOauthInDb(db, userId, accessToken, accessTokenSecret, twitterUserId, screenName, callback) {
    db.query("INSERT INTO oauth_" + name + " (user_id, oauth_token, oauth_token_secret, twitter_user_id, screen_name) VALUES (?, ?, ?, ?, ?)",
        [userId, accessToken, accessTokenSecret, twitterUserId, screenName], (err) => {
            if (err !== null) {
                callback(400, {error: "you're already connected with this service"});
            } else {
                callback(200, {message: "ok"});
            }
        });
}

function addOauth(db, userId, body, callback) {
    if (body.hasOwnProperty("oauth_token") === false || typeof body.oauth_token !== "string" ||
        body.hasOwnProperty("oauth_verifier") === false || typeof body.oauth_verifier !== "string") {
        callback(400, {error: "invalid body"});
    }
    client.getAccessToken(body.oauth_token, "", body.oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
        if (error) {
            callback(400, {error: "could not validate your credentials"});
        } else {
            client.verifyCredentials(accessToken, accessTokenSecret, null, function(error, data, response) {
                if (error) {
                    callback(400, {error: "could not validate credentials"});
                } else {
                    addOauthInDb(db, userId, accessToken, accessTokenSecret, results.user_id, results.screen_name, callback);
                }
            });
        }
    });
}

function makeRequest(db, userId, namespace, type, params, callback) {
    getCredentials(db, userId, (err, results) => {
        if (err !== null || results.length !== 1) {
            callback("You're not logged in with twitter", null);
        } else {
            client[namespace](type, params, results[0].oauth_token, results[0].oauth_token_secret, (error, data) => {
                if (error !== null) {
                    if (error.statusCode === 401) {
                        callback("API key not provided", null);
                    } else {
                        callback("An error occurred", data);
                    }
                } else {
                    callback(null, data);
                }
            });
        }
    });
}

const widgets = [
    require('./account')(makeRequest),
    require('./favorites')(makeRequest)
];

// Exported data
module.exports = {
    name,
    display_name,
    need_oauth,
    getOauthStatus,
    addOauth,
    widgets,
};