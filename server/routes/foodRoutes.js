const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getFoods,
  getRecommendations
} = require("../controllers/foodController");

router.get("/", getFoods);
router.get("/recommendations", authMiddleware, getRecommendations);

module.exports = router;