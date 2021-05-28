// General informations
const name = "news";
const display_name = "News";
const need_oauth = false;

const widgets = [
    require('./breaking_news'),
    require('./topic_news'),
];

// Exported data
module.exports = {
    name,
    display_name,
    need_oauth,
    widgets,
};