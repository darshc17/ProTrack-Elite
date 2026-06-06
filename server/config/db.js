const { Pool } = require("pg");
require("dotenv").config(); // Ensure env variables are loaded

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : undefined,
  // If not in production, use individual config variables for local dev
  user: isProduction ? undefined : process.env.DB_USER,
  password: isProduction ? undefined : process.env.DB_PASSWORD,
  host: isProduction ? undefined : process.env.DB_HOST,
  port: isProduction ? undefined : process.env.DB_PORT,
  database: isProduction ? undefined : process.env.DB_NAME,
  
  // SSL is required for Render/Cloud PostgreSQL
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

module.exports = pool;