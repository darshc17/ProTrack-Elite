const express = require("express");

const router = express.Router();
const authMiddleware=require("../middleware/authMiddleware");


const {
  getDailySummary,getWeeklySummary,getMonthlySummary,getProteinTrend
} = require("../controllers/dashboardController");

router.get(
  "/trend",
  authMiddleware,
  getProteinTrend
);

router.get(
  "/",
  authMiddleware,
  getDailySummary
);

router.get(
  "/weekly",
  authMiddleware,
  getWeeklySummary
);
router.get(
  "/monthly",
  authMiddleware,
  getMonthlySummary
);
module.exports = router;