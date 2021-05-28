const mongoose = require("mongoose");
const jokeSchema = new mongoose.Schema({
    posted_by: {
        type: mongoose.Schema.ObjectId, //user id that the post belongs to
        ref: "User", //Many-To-One relation established to the User schema
    },

    action_french_joke: { type: Boolean },
    action_english_joke: { type: Boolean },
    action_programming_joke: { type: Boolean },
    action_christmas_joke: { type: Boolean },

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

module.exports = mongoose.model("Joke", jokeSchema);