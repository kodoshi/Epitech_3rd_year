const Post = require("../models/joke");
const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const fetch = require("node-fetch");
const { sendEmail } = require("../validation/helper");
const { react_with_email, updateUserLog } = require("./discord.js");

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
                $push: { joke_services: post._id }, //sent from frontend
            },
            (err, result) => {
                if (err) {
                    return res.status(400).json({ error: err });
                }
            }
        );
    });
};

function finalize_email_send(collection, msg) {
    for (const [key, value] of Object.entries(collection)) {
        updateUserLog(collection, react_with_email(value.receiving_email_address, msg))
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) { console.log(err) }
}


async function getJokeData(url) {
    try {
        const data = await fetchData(url);
        const isdata = {
            setup: data.setup,
            delivery: data.delivery,
        };
        return isdata;
    } catch (err) { console.log(err) }
}

setInterval(() => {
    const promisefr = getJokeData('https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=racist&type=twopart');
    const promiseen = getJokeData('https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist&type=twopart');
    const promisepr = getJokeData('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=racist&type=twopart');
    const promisech = getJokeData('https://v2.jokeapi.dev/joke/Christmas?blacklistFlags=racist&type=twopart');

    promisefr.then(data => {
        let msg = `New french joke received: ${data.setup} ${data.delivery}`

        Post.find({ action_french_joke: true })
            .then((posts) => {
                updateUserLog(posts, msg);
            })

        //reaction tie-in
        Post.find({ action_french_joke: true, reaction_send_email: true })
            .then((posts) => {
                finalize_email_send(posts, msg)
            })
    });

    promiseen.then(data => {
        let msg = `New english joke received: ${data.setup} ${data.delivery}`

        Post.find({ action_english_joke: true })
            .then((posts) => {
                updateUserLog(posts, msg);
            })

        //reaction tie-in
        Post.find({ action_english_joke: true, reaction_send_email: true })
            .then((posts) => {
                finalize_email_send(posts, msg)
            });
    });
    promisepr.then(data => {
        let msg = `New programming joke received: ${data.setup} ${data.delivery}`

        Post.find({ action_programming_joke: true })
            .then((posts) => {
                updateUserLog(posts, msg);
            })

        //reaction tie-in
        Post.find({ action_programming_joke: true, reaction_send_email: true })
            .then((posts) => {
                finalize_email_send(posts, msg)
            });
    });
    promisech.then(data => {
        let msg = `New christmas joke received: ${data.setup} ${data.delivery}`

        Post.find({ action_christmas_joke: true })
            .then((posts) => {
                updateUserLog(posts, msg);
            })

        //reaction tie-in
        Post.find({ action_christmas_joke: true, reaction_send_email: true })
            .then((posts) => {
                finalize_email_send(posts, msg)
            });
    });
}, 60000); //every min

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
        res.json({ message: "Astronaut Post was deleted" });
    });
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
        .select("_id action_french_joke action_english_joke action_programming_joke action_christmas_joke  reaction_send_email created_at photo")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({ error: err });
            }
            req.post = post;
            next();
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
 * Delete All method, wipes every specific service collection that are created by the user, then wipes the OneToMany array from User
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @returns {object} req.post
 */
exports.deleteAll = async (req, res) => {
    Post.deleteMany({ posted_by: req.profile._id })
        .then(post => {
            console.log("All joke collections were deleted")
        })
        .catch(err => console.log(err));

    User.findByIdAndUpdate(req.profile._id, { $set: { joke_services: [] } })
        .then(user => {
            console.log("All joke collection IDs were deleted from User")
        }).catch(err => console.log(err));
};
