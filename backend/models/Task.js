const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("pending", "done"),
    defaultValue: "pending",
  },
  dueDate: DataTypes.DATE,
});

module.exports = Task;