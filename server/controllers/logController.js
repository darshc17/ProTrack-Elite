const pool = require("../config/db");

const addFoodLog = async (req, res) => {
  try {
    const { foodId, quantity, mealType } = req.body;
    const userId = req.userId;
    if (!quantity || quantity <= 0) {
  return res.status(400).json({
    message: "Quantity must be greater than 0"
  });
}
    const foodResult = await pool.query(
      "SELECT * FROM foods WHERE id = $1",
      [foodId]
    );

    const food = foodResult.rows[0];

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    let referenceQty = parseFloat(food.reference_quantity) || 100;
    let proteinVal = parseFloat(food.protein) || 0;
    let caloriesVal = parseFloat(food.calories) || 0;
    const servingUnit = food.serving_unit || '100g';
    
    // Handle different serving units differently
    // For piece-based foods (roti, idli), reference_qty=1 (per piece)
    // For gram-based foods (100g), reference_qty=100
    // For ml-based foods (100ml), reference_qty=100
    
    if (!servingUnit.toLowerCase().includes('piece')) {
      // Only apply magnitude correction to weight/volume based foods
      const proteinRatio = proteinVal / referenceQty;
      if (proteinRatio > 1) {
        // Protein value is too high relative to reference quantity
        // Assume it's stored incorrectly and divide by 100
        proteinVal = proteinVal / 100;
        caloriesVal = caloriesVal / 100;
      }
    }
    // For piece-based foods, keep values as-is (protein is already per piece)
    
    const protein =
      (proteinVal / referenceQty) *
      quantity;

    const calories =
      (caloriesVal / referenceQty) *
      quantity;

    await pool.query(
  `INSERT INTO food_logs
  (user_id, food_id, meal_type, quantity, protein, calories, log_date)
  VALUES ($1,$2,$3,$4,$5,$6,CURRENT_DATE)`,
  [
    userId,
    foodId,
    mealType,
    quantity,
    protein,
    calories
  ]
);

res.json({
  message: "Food logged successfully",
  food: food.food_name,
  protein,
  calories
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};
const getFoodLogs = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `
      SELECT
          fl.id,
          f.food_name,
          fl.meal_type,
          fl.quantity,
          fl.protein,
          fl.calories,
          fl.log_date
      FROM food_logs fl
      JOIN foods f
      ON fl.food_id = f.id
      WHERE fl.user_id = $1
      AND fl.log_date = CURRENT_DATE
      ORDER BY fl.id DESC
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};
const deleteFoodLog = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM food_logs WHERE id = $1",
      [id]
    );

    res.json({
      message: "Food log deleted"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};
module.exports = {
  addFoodLog,
  getFoodLogs,
  deleteFoodLog
};