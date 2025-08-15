import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const adminName = sessionStorage.getItem("adminName");
  const adminEmail = sessionStorage.getItem("adminEmail");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3">
      <h1 className="text-lg font-bold text-gray-700">Admin Dashboard</h1>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold">{adminName}</p>
          <p className="text-sm text-gray-500">{adminEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
