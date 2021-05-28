const express = require("express");
const router = express.Router();
const jokeController = require("../controllers/joke");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const validator = require("../validation/helper");

/**
 * routes getting 'filtered' through middlewares
 */
router.post(
  "/joke/:userId",
  authController.requireSignin,
  jokeController.createPost,
  //validator.createPostValidator //needs to run at the end so formidable package doesnt throw "Insert Title" error
);

router.get("/joke/:postId", jokeController.singlePost);

router.delete(
  "/joke/all/:userId",
  authController.requireSignin,
  jokeController.deleteAll
);

router.get("/joke/photo/:postId", jokeController.photo);

router.param("userId", userController.userById); //userById() with be executed in routes that have :userId
router.param("postId", jokeController.postById); //postById() with be executed in routes that have :postId

module.exports = router;