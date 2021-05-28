const mongoose = require("mongoose");
const astronautSchema = new mongoose.Schema({
    posted_by: {
        type: mongoose.Schema.ObjectId, //user id that the post belongs to
        ref: "User", //Many-To-One relation established to the User schema
    },

    action_location: { type: Boolean },
    action_solar_location: { type: Boolean },
    action_other_stats: { type: Boolean },

    reaction_send_email: { type: Boolean },
    receiving_email_address: { type: String },

    created_at: {
        type: Date,
        default: Date.now,
    },

    photo: {
        data: Buffer,
        //will hold the format of the picture uploaded
        contentType: String,
    },
});

module.exports = mongoose.model("Astronaut", astronautSchema);