const User = require("../models/user");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

/**
 * User by ID method, fills req.profile object with the user that corresponds to the ID given
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @param {object} next allows the method to go to the next middleware
 * @param {string} id holds individual _id of user
 * @returns {json} res.json
 */
exports.userById = (req, res, next, id) => {
    User.findById(id)
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({ error: "User not found" });
            }
            req.profile = user; //profile object in request gets user info
            next(); //so we dont get stuck
        });
};

/**
 * Has Authorization method, compares ID from req.profile to the ID currently authenticated, if this is true=> user is accessing his own resources.
 * If the admin is authenticated, he has automatic authorization.
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @param {object} next allows the method to go to the next middleware
 * @returns {json} res.json
 */
exports.hasAuthorization = (req, res, next) => {
    let sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
    let adminUser = req.profile && req.auth && req.auth.role === "admin";

    // console.log("req.profile ", req.profile, " req.auth ", req.auth);
    // console.log("SAMEUSER", sameUser, "ADMINUSER", adminUser);

    if (!(sameUser || adminUser)) {
        return res.status(403).json({
            error: "User is not authorized to perform this action",
        });
    }
    next();
};

/**
 * All Users method, finds all users in DB and returns them in a single object, in json format
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @returns {json} res.json
 */
exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        res.json(users);
    }).select("name email created_at updated_at role");
};

/**
 * Get User method that returns the user inside the request.profile object (json), with salt and hashed_password omitted
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @returns {json} res.json
 */
exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined; //not sent to the front-end, security-based omission
    req.profile.salt = undefined; //not sent to the front-end, security-based omission
    //console.log(req.profile);
    return res.json(req.profile);
};

/**
 * Update User method that edits the user inside the req.profile with lodash.extend method,
 * date of update gets persisted in the DB and updated user is returned in the response,
 * photo uploaded gets saved in the DB with formidable package
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @param {object} next allows the method to go to the next middleware
 * @returns {json} res.json
 */
exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm();
    // console.log("incoming form data: ", form);
    form.keepExtensions = true; //saving photo .extention
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Picture upload failed",
            });
        }
        //save user
        let user = req.profile; //defined in userById method above
        // console.log("user in update: ", user);

        //lodash changes the user object with the added info from the fields
        user = _.extend(user, fields);
        user.updated_at = Date.now(); //date of update gets logged to be saved in the DB
        // console.log("USER FORM DATA UPDATE: ", user);

        if (files.photo) {
            //handle the incoming picture, persist it in the DB
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            user.hashed_password = undefined; //security based omision
            user.salt = undefined; //security based omision
            // console.log("user after update with formdata: ", user);
            res.json(user);
        });
    });
};

/**
 * Delete User method, gets current user from req.profile, removes it and returns a json success message
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @param {object} next allows the method to go to the next middleware
 * @returns {json} res.json
 */
exports.deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json({ message: "User deletion successful" });
    });
};

/**
 * User Photo method, checks if user picture exists and sends it in res.profile object
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @param {object} next allows the method to go to the next middleware
 * @returns {json} res.json
 */
exports.userPhoto = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.contentType);
        return res.send(req.profile.photo.data);
    }
    next();
};

/**
 * Get logs method, returns json collection of the most 6 recent entries
 *
 * @param {object} req HTTP request from express
 * @param {object} res HTTP response from express
 * @returns {object} req.post
 */
exports.getLogs = async (req, res) => {
    User.findById(req.profile._id)
        .then(user => {
            //pagination
            res.status(200).json(user.logs.slice((user.logs.length - 6), user.logs.length));
        })
        .catch(err => console.log(err));
};