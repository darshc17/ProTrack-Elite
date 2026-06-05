const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  addWeightLog,
  getWeightLogs,
  getWeightTrend,
} = require("../controllers/weightController");

router.post(
  "/",
  authMiddleware,
  addWeightLog
);

router.get(
  "/",
  authMiddleware,
  getWeightLogs
);

router.get(
  "/trend",
  authMiddleware,
  getWeightTrend
);

module.exports = router;