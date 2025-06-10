// src/pages/PurchaseHistory.jsx
import React from 'react';

const PurchaseHistory = () => {
  // Dummy data, replace with real purchase history from API
  const purchases = [
    { id: 1, buyer: 'Alice', book: 'React Basics', date: '2025-05-25', status: 'Paid', amount: '$10' },
    { id: 2, buyer: 'Bob', book: 'Learning Tailwind', date: '2025-05-26', status: 'Pending', amount: '$12' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Purchase History</h2>
      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left">Buyer</th>
            <th className="py-3 px-6 text-left">Book</th>
            <th className="py-3 px-6 text-center">Date</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(p => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6">{p.buyer}</td>
              <td className="py-3 px-6">{p.book}</td>
              <td className="py-3 px-6 text-center">{p.date}</td>
              <td className="py-3 px-6 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    p.status === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {p.status}
                </span>
              </td>
              <td className="py-3 px-6 text-right">{p.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistory;
