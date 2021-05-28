
const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weather");
/**
 * routes getting 'filtered' through middlewares
 */

router.get("/weather", weatherController.getWeather);

module.exports = router;