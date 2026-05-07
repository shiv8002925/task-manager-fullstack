
import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
     console.log(err.response?.data);

alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (


    <div className="flex h-screen justify-center items-center">
      <div className="p-6 border rounded w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ LOGIN BUTTON */}
        <button
          className="bg-blue-500 text-white p-2 w-full"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* ✅ ADD THIS EXACTLY HERE */}
        <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}