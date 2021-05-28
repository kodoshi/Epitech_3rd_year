const axios = require('axios');

const name = "notifications";
const display_name = "Notifications";
const description = "See your last notifications from Epitech Intranet";
const params = [
    {
        name: "autologin",
        type: "string",
        description: "Your autologin code start with \"auth-\" and is available on intra.epitech.eu/admin/autolog",
        placeholder: "auth-1111111111111111111111111111111111111111"
    },
    {
        name: "max_notifications",
        type: "number",
        description: "Maximum number of notification in the widget",
        default: 5,
        min: 1,
        max: 5
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

const invalidAutologin = "<div> Your autologin is not valid </div>";
const internalError = "<div> Could not get data</div>";

function parseResponse(response, autologin, max) {
    let html = "<div style='width:294px;height:244px;padding:3px;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:black;overflow-y:scroll;background-color:#EDF7FF'>";
    let nb = 0;
    for (let notif of response) {
        html += "<div style=\"border-bottom:1px solid black;padding:3px;\">";
        html += notif.title.replace("/" + autologin, "https://intra.epitech.eu").split(" by <a href")[0];
        html += "<div style='font-size:10px;color:gray'>" + notif.date + "</div>";
        html += "</div>";
        nb++;
        if (nb >= max)
            break;
    }
    html += "</div>";
    return html;
}

function displayWidget(db, userId, dbRaw, callback) {
    let autologin = dbRaw.autologin;
    axios.get("https://intra.epitech.eu/" + autologin + "/user/notification/message?format=json")
        .then(function (response) {
            callback(200, params, dbRaw, parseResponse(response.data, autologin, dbRaw.max_notifications));
        })
        .catch(function (error) {
            if (error.response.status === 403 || error.response.status === 404) {
                callback(200, params, dbRaw, invalidAutologin);
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