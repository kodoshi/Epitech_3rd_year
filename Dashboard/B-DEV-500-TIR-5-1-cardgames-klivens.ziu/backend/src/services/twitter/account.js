const name = "account";
const display_name = "Account stats";
const description = "See statistics of any twitter account";
const params = [
    {
        name: "account",
        type: "string",
        description: "Choose an account without the '@'",
        placeholder: "donaldtrump"
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

const styleGlobal = "width:294px;height:244px;padding:3px;font-size:15px;display:grid;align-content:center";
const styleGridItem = "align-self:center;justify-self:center;text-align:center";

function getHtml(data) {
    let html = "<div style='" + styleGlobal + ";background-color:rgb(21,32,43);color:white;font-family:system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Ubuntu,\"Helvetica Neue\",sans-serif'>";
            html += "<div style='" + styleGridItem + ";font-size:19px;font-weight:800'>" + data.name + "</div>";
            html += "<div style='" + styleGridItem + ";color:rgb(136,153,166);font-size:15px;font-weight:400'>@" + data.screen_name + "</div>";
            html += "<br/>";
            html += "<div style='" + styleGridItem + "'>" + data.description + "</div>";
            html += "<br/>";
            html += "<div style='" + styleGridItem + "'>";
            html += "<span>" + data.followers_count + " Followers | " + data.friends_count + " Following</span>";
            html += "</div>";
        html += "</div>";
    return html;
}

function getErrorHtml(error) {
    let html = "<div style='" + styleGlobal + ";background-color:rgb(21,32,43);color:white;font-family:system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Ubuntu,\"Helvetica Neue\",sans-serif'>";
    html += "<div style='" + styleGridItem + ";font-size:19px;font-weight:800'>" + error + "</div>";
    html += "</div>";
    return html;
}

function displayWidget(makeRequest) {
    return function(db, userId, dbRaw, callback) {
        makeRequest(db, userId, "users", "show", {screen_name: dbRaw.account}, (err, result) => {
            if (err !== null && result === null) {
                callback(200, params, dbRaw, getErrorHtml(err));
            } else if (typeof result === "string") {
                callback(200, params, dbRaw, getErrorHtml("This user does not exist"));
            } else {
                callback(200, params, dbRaw, getHtml(result));
            }
        });
    }
}

// Exported data
module.exports = function (makeRequest) {
    return {
        name: name,
        display_name: display_name,
        description: description,
        params: params,
        displayWidget: displayWidget(makeRequest)
    };
};