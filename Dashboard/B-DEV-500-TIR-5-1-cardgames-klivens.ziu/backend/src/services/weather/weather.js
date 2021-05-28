const axios = require('axios');

const APIkey = process.env.API_KEY_WEATHER || "none";
const name = "weather";
const display_name = "Weather";
const description = "Check weather of the selected city";
const params = [
    {
        name: "city",
        type: "string",
        description: "Choose a city",
        placeholder: "Strasbourg, London, ..."
    },
    {
        name: "refresh",
        type: "number",
        description: "Refresh interval of the widget in seconds",
        default: 300,
        min: 60,
        max: 86400
    }
];

const invalidLocation = "<div> Invalid Location </div>";
const internalError = "<div> Could not get data </div>";
const APIkeyError = "<div> API key not provided </div>";

function parseResponse(response) {
    let html = "<div style='width:294px;height:244px;padding:3px;background-color:#c3cbff'>";
    html += "<li style='text-align: center;font-size:30px;font-weight: bold'>";
    html += response.name;
    html += "</li>";
    html += "<li><div style='text-align: center'>";
    html += "<img alt='icon' style='width: 60%' src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>";
    html += "</div></li>";
    html += "<li><div style='text-align: center;font-size:30px'>";
    html += response.main.temp + "°C";
    html += "</div></li>";
    html += "</div>";
    return html;
}

function displayWidget(db, userId, dbRaw, callback) {
    let city = dbRaw.city;

    if (APIkey === "none") {
        callback(200, params, dbRaw, APIkeyError);
        return;
    }
    axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=" + APIkey)
        .then(function (response) {
            callback(200, params, dbRaw, parseResponse(response.data));
        })
        .catch(function (error) {
            if (error.response.status === 403) {
                callback(200, params, dbRaw, invalidLocation);
            } else {
                callback(200, params, dbRaw, internalError);
            }
        })
}

// Exported data
module.exports = {
    name: name,
    display_name: display_name,
    description: description,
    params: params,
    displayWidget: displayWidget
};