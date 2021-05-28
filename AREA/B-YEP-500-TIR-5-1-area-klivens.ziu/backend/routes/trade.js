const express = require("express");
const router = express.Router();
const tradeController = require("../controllers/trade");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const validator = require("../validation/helper");

/**
 * routes getting 'filtered' through middlewares
 */
router.post(
  "/trade/:userId",
  authController.requireSignin,
  tradeController.createPost,
  //validator.createPostValidator //needs to run at the end so formidable package doesnt throw "Insert Title" error
);

router.get("/trade/:postId", tradeController.singlePost);

router.delete(
  "/trade/all/:userId",
  authController.requireSignin,
  tradeController.deleteAll
);

router.get("/trade/photo/:postId", tradeController.photo);

router.param("userId", userController.userById); //userById() with be executed in routes that have :userId
router.param("postId", tradeController.postById); //postById() with be executed in routes that have :postId

module.exports = router;