const axios = require('axios');

const APIkey = process.env.API_KEY_WEATHER || "none";
const name = "forecast";
const display_name = "Forecast";
const description = "Check forecast of the selected city";
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
    let html = "<div style='width:294px;height:244px;padding:3px;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:black;overflow-y:scroll;background-color:#c3cbff'>";
    for (const data of response.list) {
        html += "<li style=\"border-bottom:1px solid black;padding:3px;\">";
        html += "<div style='text-align: center;font-weight: bold'>" + response.city.name + "</div>";
        html += "<div style='text-align: center'>" + data.dt_txt + "</div>";
        html += "<div style='text-align: center'><img alt='icon' src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'/></div>";
        html += "<div style='text-align: center;font-size: 30px'>" + data.main.temp + "°C</div>";
        html += "</li>"
    }
    html += "</div>";
    return html;
}

function displayWidget(db, userId, dbRaw, callback) {
    let city = dbRaw.city;

    if (APIkey === "none") {
        callback(200, params, dbRaw, APIkeyError);
        return;
    }
    axios.get("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&APPID=" + APIkey)
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