const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const validator = require("../validation/helper");

/**
 * routes getting 'filtered' through middlewares
 */

router.post("/signup", validator.userSignupValidator, authController.signup);
router.post("/signin", authController.signin);
router.get("/signout", authController.signout);

router.put("/forgot-password", authController.forgotPassword);
router.put("/reset-password", validator.passwordResetValidator, authController.resetPassword);

router.post("/social-login", authController.socialLogin);

router.param("userId", userController.userById); //userById() with be executed in routes that have :userId

module.exports = router;