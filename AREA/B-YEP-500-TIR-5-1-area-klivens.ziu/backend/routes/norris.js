const express = require("express");
const router = express.Router();
const norrisController = require("../controllers/norris");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const validator = require("../validation/helper");

/**
 * routes getting 'filtered' through middlewares
 */
router.post(
  "/norris/:userId",
  authController.requireSignin,
  norrisController.createPost,
  //validator.createPostValidator //needs to run at the end so formidable package doesnt throw "Insert Title" error
);

router.get("/norris/:postId", norrisController.singlePost);

router.delete(
  "/norris/all/:userId",
  authController.requireSignin,
  norrisController.deleteAll
);

router.get("/norris/photo/:postId", norrisController.photo);

router.param("userId", userController.userById); //userById() with be executed in routes that have :userId
router.param("postId", norrisController.postById); //postById() with be executed in routes that have :postId

module.exports = router;