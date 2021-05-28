const name = "favorites";
const display_name = "Favorites";
const description = "See last favorites of a Twitter account";
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

const styleGlobal = "width:294px;height:244px;padding:3px;font-size:15px;display:grid;overflow-y:scroll";
const styleGridItem = "align-self:center;justify-self:center;text-align:center";

function getHtml(data, account) {
    let html = "<div style='" + styleGlobal + ";background-color:rgb(21,32,43);color:white;font-family:system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Ubuntu,\"Helvetica Neue\",sans-serif'>";
    html += "<div style='" + styleGridItem + ";font-size:19px;font-weight:600;padding-bottom:20px'> Last favorites of @" + account + "</div>";
    for (const fav of data) {
        html += "<div style='" + styleGridItem + ";border-bottom:1px solid white;padding:10px' >" + fav.text + "</div>";
    }
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
    return function (db, userId, dbRaw, callback) {
        makeRequest(db, userId, "favorites", "list", { screen_name: dbRaw.account, count: 10 }, (err, result) => {
            if (err !== null && result === null) {
                callback(200, params, dbRaw, getErrorHtml(err));
            } else if (typeof result === "string") {
                callback(200, params, dbRaw, getErrorHtml("This user does not exist"));
            } else {
                callback(200, params, dbRaw, getHtml(result, dbRaw.account));
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