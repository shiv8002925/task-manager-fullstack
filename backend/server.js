const express = require("express");
const cors = require("cors");
require("dotenv").config();


const sequelize = require("./config/db");

// Load models
require("./models");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Test
app.get("/", (req, res) => {
  res.send("API running with MySQL 🚀");
});

// DB Sync
sequelize.sync()
.then(() => console.log("MySQL Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});