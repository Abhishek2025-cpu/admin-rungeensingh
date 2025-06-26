import React from 'react';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const Viewbook = () => {
  const books = [
    { id: 1, title: 'React Basics', enabled: true },
    { id: 2, title: 'Learning Tailwind', enabled: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg px-8 py-10">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 border-b pb-4">
          📚 Manage Books
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-6 text-left">Book Title</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 font-medium text-gray-900">{book.title}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        book.enabled
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {book.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center space-x-3">
                    <button
                      className="p-2 rounded-full text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition"
                      title="Update"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="p-2 rounded-full text-red-500 hover:bg-red-100 hover:text-red-600 transition"
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                    <button
                      className={`p-2 rounded-full transition ${
                        book.enabled
                          ? 'text-yellow-500 hover:bg-yellow-100 hover:text-yellow-600'
                          : 'text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700'
                      }`}
                      title={book.enabled ? 'Disable' : 'Enable'}
                    >
                      {book.enabled ? <FaToggleOff size={18} /> : <FaToggleOn size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Viewbook;
