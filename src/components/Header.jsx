// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can clear auth tokens or user data here if needed
    navigate("/login");
  };

  return (
    <header className="bg-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition duration-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;