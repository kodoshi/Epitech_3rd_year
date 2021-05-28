const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authController = require("../controllers/auth");

/**
 * routes getting 'filtered' through middlewares
 */


router.get(
  "/gmail",
  authController.requireSignin,
  userController.getUser
);


module.exports = router;