const pool = require("../config/db");

const getFoods = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM foods");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const userId = req.userId;

    // Get user's protein goal and today's total
    const summaryResult = await pool.query(
      `SELECT
        u.protein_goal,
        COALESCE(SUM(fl.protein), 0) AS total_protein
       FROM users u
       LEFT JOIN food_logs fl ON u.id = fl.user_id AND fl.log_date = CURRENT_DATE
       WHERE u.id = $1
       GROUP BY u.protein_goal`,
      [userId]
    );

    const summary = summaryResult.rows[0];
    if (!summary) return res.status(404).json({ message: "User not found" });

    const proteinGoal = parseFloat(summary.protein_goal);
    const totalProtein = parseFloat(summary.total_protein);
    const remainingProtein = Math.max(0, proteinGoal - totalProtein);

    // Top 6 foods by protein density
    const foodsResult = await pool.query(
      `SELECT * FROM foods
       WHERE calories > 0 AND protein >= 8.0
       ORDER BY (protein / reference_quantity) DESC
       LIMIT 6`
    );

    const recommendations = foodsResult.rows.map((food) => {
      const proteinVal = parseFloat(food.protein);
      const referenceQty = parseFloat(food.reference_quantity);
      const caloriesVal = parseFloat(food.calories);
      const servingUnit = food.serving_unit || "g";

      // Protein and calories per gram
      const proteinPerGram = proteinVal / referenceQty;
      const caloriesPerGram = caloriesVal / referenceQty;

      // Fixed sensible serving: 100g for most foods
      const servingSize = servingUnit.toLowerCase().includes("piece") ? 1 : 100;

      const proteinInServing = parseFloat((proteinPerGram * servingSize).toFixed(1));
      const caloriesInServing = Math.round(caloriesPerGram * servingSize);

      // How many servings to hit remaining goal
      const servingsNeeded = remainingProtein > 0
        ? Math.ceil(remainingProtein / proteinInServing)
        : 0;

      return {
        id: food.id,
        food_name: food.food_name,
        serving_unit: servingUnit,
        serving_size: servingSize,
        protein_per_serving: proteinInServing,
        calories_per_serving: caloriesInServing,
        protein_per_100g: ((proteinVal / referenceQty) * 100).toFixed(1),
        servings_needed: servingsNeeded,
        // quantity_to_eat kept for quick-log compatibility
        quantity_to_eat: servingSize,
        calories_introduced: caloriesInServing,
      };
    });

    res.json({
      protein_goal: proteinGoal,
      total_protein: totalProtein,
      remaining_protein: remainingProtein,
      recommendations,
    });

  } catch (error) {
    console.error("Error fetching protein recommendations:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getFoods, getRecommendations };