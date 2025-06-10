// src/pages/InventoryList.jsx
import React from 'react';

const InventoryList = () => {
  // TODO: Replace dummy data with real API data
  const books = [
    { id: 1, title: 'React Basics', enabled: true },
    { id: 2, title: 'Learning Tailwind', enabled: false },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Inventory</h2>
      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left">Book Title</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
<tr key={book.id} className="border-b hover:bg-gray-50">
  <td className="py-3 px-6 font-medium text-gray-800">{book.title}</td>
  <td className="py-3 px-6 text-center">
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        book.enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}
    >
      {book.enabled ? 'Enabled' : 'Disabled'}
    </span>
  </td>
  <td className="py-3 px-6 text-center space-x-2">
    <button
      className="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200"
    >
      Update
    </button>

    <button
      className="inline-flex items-center px-4 py-2 text-sm font-medium border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition duration-200"
    >
      Delete
    </button>

    <button
      className={`inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg transition duration-200 ${
        book.enabled
          ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'
          : 'border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white'
      }`}
    >
      {book.enabled ? 'Disable' : 'Enable'}
    </button>
  </td>
</tr>


          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
