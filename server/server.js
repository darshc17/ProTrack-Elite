require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const foodRoutes = require("./routes/foodRoutes");
const logRoutes = require("./routes/logRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const weightRoutes =require("./routes/weightRoutes");
const profileRoutes=require("./routes/profileRoutes")
const app = express();

app.use(cors({
  origin: ['http://localhost:3000','http://localhost:5173', 'http://localhost', 'capacitor://localhost'],
  credentials: true
}));app.use(express.json());

app.use("/foods", foodRoutes);
app.use("/food-logs", logRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);
app.use("/weight", weightRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("Protein Tracker API Running");
});



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});