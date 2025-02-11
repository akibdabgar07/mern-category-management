const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
var logger = require("morgan");
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
// Connect to MongoDB
connectDB();

var authRoutes = require("./routes/authRoutes");
var categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);

// Export the app
module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
