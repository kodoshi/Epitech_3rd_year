const Post = require("../models/discord");
const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const Discord = require("discord.js");
const { sendEmail } = require("../validation/helper");
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] });
//partials lets you re-cache when events are triggered, useful when bot restarts but some messages/reactions stay out of the new cache
const PREFIX = "$";

client.login(process.env.DISCORD_BOT_TOKEN);

/**
 * formidable package methods being used to handle image upload within the post
 * Create Post function currently, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @param {object} next allows the method to go to the next middleware
 * @returns {object} res.json
 */

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true; //if picture uploaded is jpeg or png, that specific format will be saved
    //based on request, handle the file parsing
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: "Image upload failed" });
        }
        let post = new Post(fields);
        //user_id = req.profile._id
        req.profile.hashed_password = undefined; //not sent to the front-end, security-based ommission
        req.profile.salt = undefined; //not sent to the front-end, security-based ommission
        post.posted_by = req.profile; //profile object in request will hold the user id, name, email etc
        //if the picture exists
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path); //file is stored
            post.photo.contentType = files.photo.type; //type of file get stored as String
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            res.json(result); //no {} wrapper, result will be the post itself
        });

        //referencing the new discord post into the User that made it
        User.findByIdAndUpdate(
            req.profile._id, //sent from frontend
            {
                $push: { discord_services: post._id }, //sent from frontend
            },
            (err, result) => {
                if (err) {
                    return res.status(400).json({ error: err });
                }
            }
        );
    });
};

/**
 * Confirms the bot is running
 */
client.on('ready', () => {
    console.log(`Discord bot instance connected as: ${client.user.username}`);
});

exports.updateUserLog = (collection, msg) => {
    for (const [key, value] of Object.entries(collection)) {
        User.findByIdAndUpdate(
            value.posted_by,
            {
                $push: { logs: msg },
            },
            (err, result) => {
                if (err) {
                    console.log(err)
                }
            })
    }
}



/**
 * Notices that a message was received on Discord
 */
client.on('message', async (message) => {
    let starter = "Newest discord message received: ";
    let loggedmsg = starter.concat(message.content);
    Post.find({ action_new_message: true })
        .then((posts) => {
            updateUserLog(posts, loggedmsg);
        })

    Post.find({ action_new_message: true, reaction_create_channel: true })
        .then((posts) => {
            finalize_text_channel(posts)
        })

    Post.find({ action_new_message: true, reaction_create_voice_channel: true })
        .then((posts) => {
            finalize_voice_channel(posts)
        })
    Post.find({ action_new_message: true, reaction_send_email: true })
        .then((posts) => {
            finalize_email_send(posts)
        })
});

/**
 * Notices that a member was added in a Server
 */
client.on('guildMemberAdd', async (member) => {
    let starter = "A new discord member has joined, named ";
    let loggedmsg = starter.concat(member.displayName);
    Post.find({ action_user_joins: true })
        .then((posts) => {
            updateUserLog(posts, loggedmsg);
        })

    Post.find({ action_user_joins: true, reaction_create_channel: true })
        .then((posts) => {
            finalize_text_channel(posts)
        })

    Post.find({ action_user_joins: true, reaction_create_voice_channel: true })
        .then((posts) => {
            finalize_voice_channel(posts)
        })
    Post.find({ action_user_joins: true, reaction_send_email: true })
        .then((posts) => {
            finalize_email_send(posts)
        })
});

/**
 * Notices that a channel was added in a Server
 */
client.on('channelCreate', async (channel) => {
    let starter = "A new channel has been created, named ";
    let loggedmsg = starter.concat(channel.name);
    Post.find({ action_new_channel: true })
        .then((posts) => {
            updateUserLog(posts, loggedmsg);
        })

    Post.find({ action_new_channel: true, reaction_create_channel: true })
        .then((posts) => {
            finalize_text_channel(posts)
        })
    Post.find({ action_new_channel: true, reaction_create_voice_channel: true })
        .then((posts) => {
            finalize_voice_channel(posts)
        })
    Post.find({ action_new_channel: true, reaction_send_email: true })
        .then((posts) => {
            finalize_email_send(posts)
        })
})

/**
 * Notices that a member was banned
 */
client.on('guildBanAdd', guild => {
    let starter = "A member has been banned from the server named";
    let loggedmsg = starter.concat(guild.name);
    Post.find({ action_user_banned: true })
        .then((posts) => {
            updateUserLog(posts, loggedmsg);
        })
    Post.find({ action_user_banned: true, reaction_create_channel: true })
        .then((posts) => {
            finalize_text_channel(posts)
        })
    Post.find({ action_user_banned: true, reaction_create_voice_channel: true })
        .then((posts) => {
            finalize_voice_channel(posts)
        })
    Post.find({ action_user_banned: true, reaction_send_email: true })
        .then((posts) => {
            finalize_email_send(posts)
        })
})

/**
 * Notices that a member was kicked
 */
client.on('guildKickAdd', guild => {
    let starter = "A member has been kicked from the server named";
    let loggedmsg = starter.concat(guild.name);
    Post.find({ action_user_kicked: true })
        .then((posts) => {
            updateUserLog(posts, loggedmsg);
        })
    Post.find({ action_user_kicked: true, reaction_create_channel: true })
        .then((posts) => {
            finalize_text_channel(posts)
        })
    Post.find({ action_user_kicked: true, reaction_create_voice_channel: true })
        .then((posts) => {
            finalize_voice_channel(posts)
        })
    Post.find({ action_user_kicked: true, reaction_send_email: true })
        .then((posts) => {
            finalize_email_send(posts)
        })
})

function finalize_text_channel(collection) {
    for (const [key, value] of Object.entries(collection)) {
        updateUserLog(collection, react_with_text_channel(value.name_of_channel))
    }
}

function finalize_voice_channel(collection) {
    for (const [key, value] of Object.entries(collection)) {
        updateUserLog(collection, react_with_voice_channel(value.name_of_channel))
    }
}
function finalize_email_send(collection) {
    for (const [key, value] of Object.entries(collection)) {
        updateUserLog(collection, react_with_email(value.receiving_email_address, value.email_to_send))
    }
}

/**
 * React with creating text channel method for discord, receives name and creates that channel
 * @param {string} name name of the channel to be created
 * @returns {string} success or fail string
 */
function react_with_text_channel(name) {
    try {
        client.guilds.cache.forEach(guild => {
            const result = guild.channels.create(name, "text");
            if (!result) return ('');

            return (`A text channel named ${name} has been created by a reaction`)
        });
    }
    catch (err) {
        console.log(`Error by react with text channel: ${err}`);
    }
}

/**
 * React with creating voice channel method for discord, receives name and creates that channel
 * @param {string} name name of the channel to be created
 * @returns {string} success or fail string
 */
function react_with_voice_channel(name) {
    try {
        client.guilds.cache.forEach(guild => {
            const result = guild.channels.create(name, {
                type: 'voice',
            });
            if (!result) return ('');

            return (`A voice channel named ${name} has been created by a reaction`)
        });
    }
    catch (err) {
        console.log(`Error by react with voice channel: ${err}`);
    }
}

/**
 * React with email method, for ISS api, receives email address and the content of the email to be sent, returns a succes string or an error string
 * @param {string} address email address
 * @param {string} content email content
 * @returns {string} success or fail string
 */
exports.react_with_email = (address, content) => {
    try {
        const emailData = {
            from: "noreply@node-react.com",
            to: address,
            subject: "AREA Reaction",
            text: `${content}`,
            html: `<p>${content}</p>`
        };

        sendEmail(emailData);
        return (`An email has been sent to ${address} by a reaction`)
    }
    catch (err) {
        console.log(`Error by send email reaction: ${err}`);
    }
};


/**
 * Post by Id method, finds post by an ID and assigns it to req.post object, or returns 400 http code with a json error
 *
 * @param {object} req HTTP request from express
 * @param {*} res HTTP response from express
 * @param {*} next allows the method to go to the next middleware
 * @param {string} id holds individual _id of user
 */
exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate("posted_by", "_id name") //needed to communicate with User model, that holds (user) _id and name
        .select("_id action_new_message action_user_joins action_new_channel reaction_send_message reaction_create_channel reaction_send_email created_at photo")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({ error: err });
            }
            req.post = post;
            next();
        });
};

/**
 * Get Post function currently, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 */
exports.getPosts = (req, res) => {
    const posts = Post.find()
        .populate("posted_by", "_id name") //needed to communicate with User model, that holds (user) _id and name
        .select("_id action_new_message action_user_joins action_new_channel reaction_send_message reaction_create_channel reaction_send_email created_at photo")
        .sort({ created_at: -1 })
        .then((posts) => {
            res.json(posts); //default 200 http code
        })
        .catch((err) => console.log(err));
    //console.log("Im here rn", posts);
};

/**
 * Posts by User function currently, queries and selections to/from db are made here with standart MongoDB methods, json response is being returned
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @returns {object} res.json
 */
exports.postsByUser = (req, res) => {
    Post.find({ created_by: req.profile._id })
        .populate("posted_by", "_id name") //needed to communicate with User model, that holds (user) _id and name
        .select("_id action_new_message action_user_joins action_new_channel reaction_send_message reaction_create_channel reaction_send_email created_at photo")
        .sort("_created") //earliest gets shown first
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            res.json(posts);
        });
};

/**
 * Is Poster method, checks if req.post and req.auth exist and that the ID of the User that posted that specific post matches with the User ID currently authorized
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @param {object} next allows the method to go to the next middleware
 * @returns {string} res.json
 */
exports.isPoster = (req, res, next) => {
    let sameUser = req.post && req.auth && req.post.posted_by._id == req.auth._id;
    let adminUser = req.post && req.auth && req.auth.role === "admin";

    if (!(sameUser || adminUser)) {
        return res.status(403).json({ error: "User is not authorized" });
    }
    next();
};

/**
 * Delete Post method, gets a post from req.body object, removes it and returns a json success message
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @returns {string} res.json
 */
exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json({ message: "Discord Post was deleted" });
    });
};

/**
 * Photo method, sets the response’s HTTP header field to the extention that the picture has (eg: .png . jpeg  etc...), and sends the data of the file itself in the response
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @param {object} next allows the method to go to the next middleware
 * @returns {object} req.post.photo.data
 */
exports.photo = (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data);
};

/**
 * Single Post method, returns a single post in json format
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @returns {object} req.post
 */
exports.singlePost = (req, res) => {
    return res.json(req.post);
};

/**
 * Delete All method, wipes every specific service collection that are created by the user, then wipes the OneToMany array from User
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @returns {object} req.post
 */
exports.deleteAll = async (req, res) => {
    /*Post.deleteMany({ posted_by: req.profile._id }, function (err) {
        if (err) return handleError(err);
        //
      });*/
    Post.deleteMany({ posted_by: req.profile._id })
        .then(post => {
            console.log("All discord collections were deleted")
        })
        .catch(err => console.log(err));

    User.findByIdAndUpdate(req.profile._id, { $set: { discord_services: [] } })
        .then(user => {
            console.log("All discord collection IDs were deleted from User")
        }).catch(err => console.log(err));
};