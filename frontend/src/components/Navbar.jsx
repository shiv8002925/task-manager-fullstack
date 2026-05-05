import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      {/* Logo */}
      <h1 className="text-xl font-bold tracking-wide">
        Task Manager
      </h1>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        
        <Link
          to="/dashboard"
          className="px-3 py-1 rounded hover:bg-gray-700 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="px-3 py-1 rounded hover:bg-gray-700 transition"
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          className="px-3 py-1 rounded hover:bg-gray-700 transition"
        >
          Tasks
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}