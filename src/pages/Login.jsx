// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`https://rungeensingh.in/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrNumber: username,
          password: password
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Store admin details in sessionStorage
        sessionStorage.setItem("adminId", data.admin._id);
        sessionStorage.setItem("adminName", data.admin.name);
        sessionStorage.setItem("adminEmail", data.admin.email);

        toast.success("Login successful!", { position: "top-right" });
        navigate("/dashboard"); // redirect to protected route
      } else {
        toast.error(data.message || "Invalid username or password", { position: "top-right" });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f3f4f6] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-[#e5e7eb]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Rangin Web Logo" className="h-16 w-auto" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Rungeen Singh Admin Login
        </h2>

        <label htmlFor="username" className="block mb-2 text-gray-700">
          Email or Mobile Number
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 mb-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email or number"
          required
        />

        <label htmlFor="password" className="block mb-2 text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />

        <p
          onClick={() => navigate("/forgotPassword")}
          className="mb-6 text-right text-sm text-blue-600 hover:underline cursor-pointer"
        >
          Forgot password
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
