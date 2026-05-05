import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Fetch Error:", err.response?.data || err.message);
    }
  };

  // ➕ Create new task
  const createTask = async () => {
    if (!title.trim()) {
      return alert("Enter task title");
    }

    try {
      await API.post("/tasks", {
        title,
        status: "pending",
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log("Create Error:", err.response?.data || err.message);
    }
  };

 
  const toggleStatus = async (task) => {
    const newStatus = task.status === "done" ? "pending" : "done";

    try {
      await API.put(`/tasks/${task.id}`, {
        status: newStatus,
      });

      fetchTasks();
    } catch (err) {
      console.log("Update Error:", err.response?.data || err.message);
    }
  };

  
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Tasks</h1>

        {/* ➕ Input Section */}
        <div className="flex gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="border p-2 flex-1 rounded"
          />

          <button
            onClick={createTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>

        {/* 📋 Task List */}
        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-gray-500">No tasks yet</p>
          )}

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-white shadow p-3 rounded border"
            >
              {/* 📝 Title */}
              <span
                className={`${
                  task.status === "done"
                    ? "line-through text-gray-500"
                    : ""
                }`}
              >
                {task.title}
              </span>

              {/* 🔁 Toggle Button */}
              <button
                onClick={() => toggleStatus(task)}
                className={`px-3 py-1 rounded text-white ${
                  task.status === "done"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {task.status === "done" ? "Mark Pending" : "Mark Done"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}