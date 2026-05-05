import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const createProject = async () => {
    await API.post("/projects", { name });
    setName("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-xl mb-4">Projects</h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          className="border p-2"
        />

        <button
          onClick={createProject}
          className="bg-green-500 text-white p-2 ml-2"
        >
          Add Project
        </button>

        {projects.map((p) => (
          <div key={p.id} className="mt-2 border p-2 rounded">
            {p.name}
          </div>
        ))}
      </div>
    </>
  );
}