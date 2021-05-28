// General informations
const name = "weather";
const display_name = "Weather";
const need_oauth = false;

const widgets = [
    require('./weather'),
    require('./forecast')
];

// Exported data
module.exports = {
    name,
    display_name,
    need_oauth,
    widgets,
};