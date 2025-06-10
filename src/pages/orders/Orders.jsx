import React from "react";

const Orders = () => {
  const orderHistory = [
    {
      id: 1,
      book: "Atomic Habits",
      date: "2025-05-12",
      amount: "₹299",
      status: "Success",
    },
    {
      id: 2,
      book: "The Psychology of Money",
      date: "2025-04-30",
      amount: "₹399",
      status: "Success",
    },
    {
      id: 3,
      book: "Deep Work",
      date: "2025-04-10",
      amount: "₹349",
      status: "Failed",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider border-b">
            <tr>
              <th className="py-3 px-4">Book</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800">{order.book}</td>
                <td className="py-3 px-4 text-gray-700">{order.date}</td>
                <td className="py-3 px-4 text-gray-700">{order.amount}</td>
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
