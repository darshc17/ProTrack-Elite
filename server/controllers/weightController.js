const pool = require("../config/db");

const addWeightLog = async (req, res) => {
  try {
    const userId = req.userId;

    const { weight } = req.body;

    await pool.query(
      `
      INSERT INTO weight_logs
      (user_id, weight)
      VALUES ($1,$2)
      `,
      [userId, weight]
    );

    res.json({
      message: "Weight logged successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getWeightLogs = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `
      SELECT *
      FROM weight_logs
      WHERE user_id = $1
      ORDER BY log_date DESC
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getWeightTrend = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `
      SELECT
        log_date,
        weight
      FROM weight_logs
      WHERE user_id = $1
      ORDER BY log_date
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addWeightLog,
  getWeightLogs,
  getWeightTrend,
};