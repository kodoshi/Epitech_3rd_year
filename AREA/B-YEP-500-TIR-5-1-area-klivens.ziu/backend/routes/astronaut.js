const express = require("express");
const router = express.Router();
const astronautController = require("../controllers/astronaut");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const validator = require("../validation/helper");

/**
 * routes getting 'filtered' through middlewares
 */
router.post(
  "/astronaut/:userId",
  authController.requireSignin,
  astronautController.createPost,
  //validator.createPostValidator //needs to run at the end so formidable package doesnt throw "Insert Title" error
);

router.get("/astronaut/:postId", astronautController.singlePost);

router.delete(
  "/astronaut/all/:userId",
  authController.requireSignin,
  astronautController.deleteAll
);

router.get("/astronaut/photo/:postId", astronautController.photo);

router.param("userId", userController.userById); //userById() with be executed in routes that have :userId
router.param("postId", astronautController.postById); //postById() with be executed in routes that have :postId

module.exports = router;