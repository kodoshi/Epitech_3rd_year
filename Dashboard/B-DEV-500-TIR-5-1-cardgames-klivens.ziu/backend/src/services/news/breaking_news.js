const axios = require('axios');

const APIkey = process.env.API_KEY_NEWS || "none";
const name = "breakingnews";
const display_name = "Breaking News";
const description = "Provide breaking news headlines of the selected country";
const params = [
    {
        name: "country",
        type: "string",
        description: "Code of the country to select",
        placeholder: "ex: FR or US"
    },
    {
        name: "refresh",
        type: "number",
        description: "Refresh interval of the widget in seconds",
        default: 120,
        min: 60,
        max: 86400
    }
];

const invalidLocation = "<div> Invalid country code </div>";
const internalError = "<div> Could not get data </div>";
const APIkeyError = "<div> API key not provided </div>";

function parseResponse(response) {
    let html = "<div style='width:294px;height:244px;padding:3px;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:black;overflow-y:scroll;background-color:#ffedb3'>";
    for (const article of response.articles) {
        html += "<li style=\"border-bottom:1px solid black;padding:3px;\">";
        html += "<div style=\"font-weight: bold\">" + article.title + "</div>";
        html += "<div><a href=\"" + article.url + "\" target='_blank'> <img style='width: 100%' alt=\"Article Image\" src=\"" + article.urlToImage + "\"></a></div>";
        html += "</li>"
    }
    html += "</div>";
    return html;
}

function displayWidget(db, userId, dbRaw, callback) {
    let country = dbRaw.country;

    if (APIkey === "none") {
        callback(200, params, dbRaw, APIkeyError);
        return;
    }
    axios.get("https://newsapi.org/v2/top-headlines?country=" + country + "&apiKey=" + APIkey)
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