const express = require("express");

const router = express.Router();
const authMiddleware =
  require("../middleware/authMiddleware");
const {
  addFoodLog,
  getFoodLogs,
  deleteFoodLog,
  } = require("../controllers/logController");

router.post("/", authMiddleware, addFoodLog);

router.get(
  "/",
  authMiddleware,
  getFoodLogs
);

router.delete("/:id", authMiddleware, deleteFoodLog);
module.exports = router;