// import React from 'react';

// const ViewCategories = () => {
//   // TODO: Replace this with real category data from API or state
//   const categories = [
//     {
//       id: 1,
//       name: 'Productivity',
//       image: '/images/productivity.jpg',
//     },
//     {
//       id: 2,
//       name: 'Finance',
//       image: '/images/finance.jpg',
//     },
//     {
//       id: 3,
//       name: 'Design',
//       image: '/images/design.jpg',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-8">
//       <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">📁 View Categories</h2>

//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-gray-700">
//             <thead className="bg-gray-100 text-xs uppercase text-gray-600 border-b">
//               <tr>
//                 <th className="py-3 px-4 text-left">Image</th>
//                 <th className="py-3 px-4 text-left">Category Name</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {categories.map((category) => (
//                 <tr key={category.id} className="hover:bg-gray-50">
//                   <td className="py-4 px-4">
//                     <img
//                       src={category.image}
//                       alt={category.name}
//                       className="w-14 h-14 object-cover rounded border border-gray-300 shadow-sm"
//                     />
//                   </td>
//                   <td className="py-4 px-4 font-medium text-gray-900">{category.name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewCategories;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories on mount
  useEffect(() => {
    axios.get('https://rungeensingh.onrender.com/api/categories/get-category')
      .then(response => {
        setCategories(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Filtered categories based on search input
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Toggle status
  const handleToggleStatus = (id) => {
    setCategories(prev =>
      prev.map(cat =>
        cat._id === id
          ? { ...cat, status: cat.status === 'active' ? 'inactive' : 'active' }
          : cat
      )
    );
  };

  const handleEdit = (id) => console.log('Edit', id);
  const handleDelete = (id) => console.log('Delete', id);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📁 View Categories</h2>

        {/* 🔍 Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by category name..."
            className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* 📊 Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 border-b">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Category Name</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedCategories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <img
                      src={category.images?.[0]?.url || '/placeholder.jpg'}
                      alt={category.name}
                      className="w-14 h-14 object-cover rounded border border-gray-300 shadow-sm"
                    />
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleStatus(category._id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        category.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {category.status}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(category._id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedCategories.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ⏩ Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCategories;
