const router = require("express").Router();
const { Task } = require("../models");

router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error creating task" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching tasks" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    await task.update({
      status: req.body.status,
    });

    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error updating task" });
  }
});

module.exports = router;