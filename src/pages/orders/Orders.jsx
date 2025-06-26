import React from "react";
import { orderHistory } from "../../Custom_json/orderHistory";
import { FaBook, FaCalendarAlt, FaRupeeSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Orders = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaBook className="text-blue-500" /> Order History
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider border-b">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Book</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                {/* Image Column */}
                <td className="py-3 px-4">
                  <img
                    src={order.image}
                    alt={order.book}
                    className="h-8 w-8 object-cover"
                  />
                </td>
                {/* Book Title Column */}
                <td className="py-3 px-4 font-medium text-gray-800">
                  {order.book}
                </td>
                {/* Date Column */}
                <td className="py-3 px-4 text-gray-700">
                  {order.date}
                </td>
                {/* Amount Column */}
                <td className="py-3 px-4 text-gray-700">
                  {order.amount}
                </td>
                {/* Status Column */}
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
