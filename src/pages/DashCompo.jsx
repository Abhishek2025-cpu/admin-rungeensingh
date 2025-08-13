// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashCompo() {

  //     const navigation = useNavigate();
  // const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (!token) {
  //     navigation("/login");
  //   }
  // }, [navigation, token]);

  // Sample data
  const data = [
    { name: 'Orders', value: 400 },
    { name: 'Users', value: 300 },
    { name: 'Products', value: 300 },
    { name: 'Returns', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const barData = [
    { name: 'Mon', logins: 30 },
    { name: 'Tue', logins: 45 },
    { name: 'Wed', logins: 20 },
    { name: 'Thu', logins: 60 },
    { name: 'Fri', logins: 75 },
    { name: 'Sat', logins: 50 },
    { name: 'Sun', logins: 40 },
  ];  

  return (
      <main className="flex-1 p-6 overflow-y-auto bg-white shadow-inner">

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-50 p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-2">Activity Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="logins" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-2">System summary</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
          </div>

        </main>

  )
}
