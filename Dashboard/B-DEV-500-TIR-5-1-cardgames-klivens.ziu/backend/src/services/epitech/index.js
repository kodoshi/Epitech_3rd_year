// General informations
const name = "epitech";
const display_name = "Epitech Intranet";
const need_oauth = false;

const widgets = [
    require('./notifications')
];

// Exported data
module.exports = {
    name,
    display_name,
    need_oauth,
    widgets,
};