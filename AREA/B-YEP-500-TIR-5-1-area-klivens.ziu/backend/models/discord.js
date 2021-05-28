const mongoose = require("mongoose");
const { MessageManager, GuildManager } = require("discord.js");
const discordSchema = new mongoose.Schema({
    posted_by: {
        type: mongoose.Schema.ObjectId, //user id that the post belongs to
        ref: "User", //Many-To-One relation established to the User schema
    },

    action_new_message: { type: Boolean },
    action_user_joins: { type: Boolean },
    action_new_channel: { type: Boolean },
    action_user_banned: { type: Boolean },
    action_user_kicked: { type: Boolean },

    reaction_create_channel: { type: Boolean },
    reaction_create_voice_channel: { type: Boolean },
    reaction_send_email: { type: Boolean },

    name_of_channel: { type: String },
    email_to_send: { type: String },
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

module.exports = mongoose.model("Discord", discordSchema);