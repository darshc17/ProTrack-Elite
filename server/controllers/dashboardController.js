const pool = require("../config/db");

const getDailySummary = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await pool.query(
      `SELECT
        COALESCE(SUM(fl.protein),0) AS total_protein,
        COALESCE(SUM(fl.calories),0) AS total_calories,
        u.protein_goal,
        ROUND((COALESCE(SUM(fl.protein),0) / u.protein_goal) * 100, 2) AS progress_percent
       FROM users u
       LEFT JOIN food_logs fl ON u.id = fl.user_id AND fl.log_date = CURRENT_DATE
       WHERE u.id = $1
       GROUP BY u.protein_goal`,
      [userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getWeeklySummary = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await pool.query(
      `SELECT
        COALESCE(SUM(daily_protein), 0) AS weekly_protein,
        COALESCE(SUM(daily_calories), 0) AS weekly_calories,
        COUNT(*) AS days_tracked,
        COALESCE(SUM(daily_protein) / NULLIF(COUNT(*), 0), 0) AS avg_daily_protein,
        COALESCE(SUM(daily_calories) / NULLIF(COUNT(*), 0), 0) AS avg_daily_calories
       FROM (
         SELECT log_date, SUM(protein) AS daily_protein, SUM(calories) AS daily_calories
         FROM food_logs
         WHERE user_id = $1 AND log_date >= CURRENT_DATE - INTERVAL '7 days'
         GROUP BY log_date
       ) daily_totals`,
      [userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await pool.query(
      `SELECT
        COALESCE(SUM(protein), 0) AS monthly_protein,
        COALESCE(SUM(calories), 0) AS monthly_calories
       FROM food_logs
       WHERE user_id = $1 AND log_date >= CURRENT_DATE - INTERVAL '30 days'`,
      [userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProteinTrend = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await pool.query(
      `SELECT
        TO_CHAR(log_date, 'DD Mon') AS day,
        ROUND(SUM(protein)::numeric, 1) AS protein
       FROM food_logs
       WHERE user_id = $1 AND log_date >= CURRENT_DATE - INTERVAL '30 days'
       GROUP BY log_date
       ORDER BY log_date`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getDailySummary, getWeeklySummary, getMonthlySummary, getProteinTrend };