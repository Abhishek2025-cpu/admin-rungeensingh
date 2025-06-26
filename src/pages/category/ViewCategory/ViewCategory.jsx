import React from 'react';

const ViewCategories = () => {
  // TODO: Replace this with real category data from API or state
  const categories = [
    {
      id: 1,
      name: 'Productivity',
      image: '/images/productivity.jpg',
    },
    {
      id: 2,
      name: 'Finance',
      image: '/images/finance.jpg',
    },
    {
      id: 3,
      name: 'Design',
      image: '/images/design.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📁 View Categories</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 border-b">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Category Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-14 h-14 object-cover rounded border border-gray-300 shadow-sm"
                    />
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCategories;
