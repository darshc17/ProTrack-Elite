const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const seed = async () => {
  // Create all tables
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      protein_goal NUMERIC DEFAULT 120,
      weight NUMERIC,
      height NUMERIC,
      goal_type VARCHAR(50)
    );

    CREATE TABLE IF NOT EXISTS foods (
      id SERIAL PRIMARY KEY,
      food_name VARCHAR(100),
      protein NUMERIC,
      calories NUMERIC,
      serving_unit VARCHAR(50),
      reference_quantity NUMERIC
    );

    CREATE TABLE IF NOT EXISTS food_logs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      food_id INTEGER REFERENCES foods(id),
      quantity NUMERIC,
      meal_type VARCHAR(20),
      log_date DATE DEFAULT CURRENT_DATE
    );

    CREATE TABLE IF NOT EXISTS weight_logs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      weight NUMERIC,
      log_date DATE DEFAULT CURRENT_DATE
    );
  `);
  console.log("Tables created!");

  // Seed foods from CSV
  const csv = fs.readFileSync(path.join(__dirname, "data/foods.csv"), "utf-8");
  const lines = csv.trim().split("\n");
  lines.shift(); // remove header

  for (const line of lines) {
    const [food_name, protein, calories, serving_unit, reference_quantity] = line.split("\t");

    await pool.query(
      `INSERT INTO foods (food_name, protein, calories, serving_unit, reference_quantity)
       VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING`,
      [
        food_name?.replace(/"/g, ""),
        protein?.replace(/"/g, ""),
        calories?.replace(/"/g, ""),
        serving_unit?.replace(/"/g, ""),
        reference_quantity?.replace(/"/g, ""),
      ]
    );
  }
  console.log("Foods seeded!");
  pool.end();
};

seed().catch(console.error);