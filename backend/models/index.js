const User = require("./User");
const Project = require("./Project");
const Task = require("./Task");

Project.belongsToMany(User, { through: "ProjectMembers" });
User.belongsToMany(Project, { through: "ProjectMembers" });

Task.belongsTo(User, { as: "assignedTo" });
Task.belongsTo(Project);

module.exports = { User, Project, Task };