import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;
  const overdue = tasks.filter(
    t => new Date(t.dueDate) < new Date() && t.status !== "done"
  ).length;

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded shadow text-center">
            <p className="text-lg">Total Tasks</p>
            <h2 className="text-2xl font-bold">{total}</h2>
          </div>

          <div className="bg-green-100 p-6 rounded shadow text-center">
            <p className="text-lg">Completed</p>
            <h2 className="text-2xl font-bold">{completed}</h2>
          </div>

          <div className="bg-red-100 p-6 rounded shadow text-center">
            <p className="text-lg">Overdue</p>
            <h2 className="text-2xl font-bold">{overdue}</h2>
          </div>
        </div>
      </div>
    </>
  );
}