const request = require('request');
require('dotenv').config()

var weatherKey = process.env.WEATHER_KEY
var locationURLPrefix = "http://api.openweathermap.org/data/2.5/weather?q=";
var coordsURLPrefix = "http://api.openweathermap.org/data/2.5/weather?";
var urlSuffix = '&APPID=' + weatherKey + "&units=metric";


/**
 * get weather method, returns info to the weather service
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @returns {object} data
 */
exports.getWeather = (req, res) => {
  let location = req.query.location;
  let latAndLon = "lat=" + req.query.latitude + '&' + "lon=" + req.query.longitude;

  try {
    if (location == "geo") {
      let url = coordsURLPrefix + latAndLon + urlSuffix;
      request(url, function (error, response, body) {
        //metrics = JSON.parse(body)
        //An e-mail will be sent if humidity is more than 80%
        res.send(body);
      });
    } else {
      let url = locationURLPrefix + location + urlSuffix;
      request(url, function (error, response, body) {
        //metrics = JSON.parse(body)
        //An e-mail will be sent if humidity is more than 80%
        res.send(body);
      });
    }
  } catch (err) {
    console.log(err)
  }
};