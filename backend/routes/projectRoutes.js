const router = require("express").Router();
const { Project } = require("../models");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
  const project = await Project.create({ name: req.body.name });
  res.json(project);
});

router.get("/", auth, async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
});

module.exports = router;