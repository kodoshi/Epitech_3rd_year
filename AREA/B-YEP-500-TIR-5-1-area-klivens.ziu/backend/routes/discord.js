const express = require("express");
const router = express.Router();
const discordController = require("../controllers/discord");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const validator = require("../validation/helper");

/**
 * routes getting 'filtered' through middlewares
 */
router.get("/discord/all", discordController.getPosts);

router.post(
  "/discord/:userId",
  authController.requireSignin,
  discordController.createPost,
  //validator.createPostValidator //needs to run at the end so formidable package doesnt throw "Insert Title" error
);
router.get(
  "/discord/by/:userId",
  //authController.requireSignin,  //maybe we dont need auth for this?
  discordController.postsByUser
);
router.get("/discord/:postId", discordController.singlePost);

router.delete(
  "/discord/all/:userId",
  authController.requireSignin,
  discordController.deleteAll
);

router.get("/discord/photo/:postId", discordController.photo);

router.param("userId", userController.userById); //userById() with be executed in routes that have :userId
router.param("postId", discordController.postById); //postById() with be executed in routes that have :postId

module.exports = router;
