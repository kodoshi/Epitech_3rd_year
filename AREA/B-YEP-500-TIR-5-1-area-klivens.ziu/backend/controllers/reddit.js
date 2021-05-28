const request = require('request');

require('dotenv').config()

var reddit_key = process.env.REDDIT_KEY;
var urlSuffix = '&APPID=' + reddit_key;


exports.getReddit = (req, res) => {
    let result = req.query.result;
    if (result == "news") {
        let url = urlSuffix;
        request(url, function (error, response, body) {
            final = JSON.parse(body)
            res.send(body);
            console.log(body)
        });
    }
};