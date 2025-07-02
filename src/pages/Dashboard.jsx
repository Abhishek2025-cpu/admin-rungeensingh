// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashCompo from "./DashCompo";

const Dashboard = () => {
  const navigation = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigation("/DashCompo");
    }
  }, [navigation, token]);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
      
           
          {/* Page Outlet */}
          <Outlet />  
      </div>
    </div>
  );
};

export default Dashboard;
