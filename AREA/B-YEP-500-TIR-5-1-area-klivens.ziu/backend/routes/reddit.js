const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const redditController = require("../controllers/reddit");

router.get("/reddit", authController.requireSignin, redditController.getReddit);

module.exports = router;

