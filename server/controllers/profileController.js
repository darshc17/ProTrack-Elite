const pool = require("../config/db");

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT id, name, email, weight, height, age, sex, goal_type, activity_level, protein_goal
       FROM users WHERE id = $1`,
      [userId]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, weight, height, age, sex, goal_type, activity_level } = req.body;

    // Base protein per kg by goal
    const baseProtein = {
      fat_loss:     1.6,
      maintain:     1.8,
      muscle_gain:  2.2,
    }[goal_type] || 1.6;

    // Small activity bonus
    const activityBonus = {
      sedentary: 0.0,
      light:     0.05,
      moderate:  0.1,
      active:    0.2,
    }[activity_level] || 0.0;

    const proteinGoal = Math.round(weight * (baseProtein + activityBonus));

    await pool.query(
      `UPDATE users SET name=$1, weight=$2, height=$3, age=$4, sex=$5,
       goal_type=$6, activity_level=$7, protein_goal=$8 WHERE id=$9`,
      [name, weight, height, age, sex, goal_type, activity_level, proteinGoal, userId]
    );

    res.json({ message: "Profile Updated", protein_goal: proteinGoal });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getProfile, updateProfile };