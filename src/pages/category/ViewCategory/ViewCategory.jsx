// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Pencil, Trash2 } from 'lucide-react';

// const ITEMS_PER_PAGE = 5;

// const ViewCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch categories on mount
//   useEffect(() => {
//     axios.get('https://rungeenbooks.onrender.com/api/categories/get-category')
//       .then(response => {
//         setCategories(response.data || []);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   // Filtered categories based on search input
//   const filteredCategories = categories.filter(cat =>
//     cat.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination logic
//   const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
//   const paginatedCategories = filteredCategories.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   // Toggle status
//   const handleToggleStatus = (id) => {
//     setCategories(prev =>
//       prev.map(cat =>
//         cat._id === id
//           ? { ...cat, status: cat.status === 'active' ? 'inactive' : 'active' }
//           : cat
//       )
//     );
//   };

//   const handleEdit = (id) => console.log('Edit', id);
//   const handleDelete = (id) => console.log('Delete', id);

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-8">
//       <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">📁 View Categories</h2>

//         {/* 🔍 Search Bar */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search by category name..."
//             className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>

//         {/* 📊 Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-gray-700">
//             <thead className="bg-gray-100 text-xs uppercase text-gray-600 border-b">
//               <tr>
//                 <th className="py-3 px-4 text-left">Image</th>
//                 <th className="py-3 px-4 text-left">Category Name</th>
//                 <th className="py-3 px-4 text-left">Status</th>
//                 <th className="py-3 px-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {paginatedCategories.map((category) => (
//                 <tr key={category._id} className="hover:bg-gray-50">
//                   <td className="py-4 px-4">
//                     <img
//                       src={category.images?.[0]?.url || '/placeholder.jpg'}
//                       alt={category.name}
//                       className="w-14 h-14 object-cover rounded border border-gray-300 shadow-sm"
//                     />
//                   </td>
//                   <td className="py-4 px-4 font-medium text-gray-900">
//                     {category.name}
//                   </td>
//                   <td className="py-4 px-4">
//                     <button
//                       onClick={() => handleToggleStatus(category._id)}
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         category.status === 'active'
//                           ? 'bg-green-100 text-green-700'
//                           : 'bg-red-100 text-red-600'
//                       }`}
//                     >
//                       {category.status}
//                     </button>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex space-x-3">
//                       <button
//                         onClick={() => handleEdit(category._id)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         <Pencil size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(category._id)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {paginatedCategories.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="py-6 text-center text-gray-500">
//                     No categories found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* add the pages as next*/}
//         {totalPages > 1 && (
//           <div className="mt-6 flex justify-center space-x-2">
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentPage(index + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === index + 1
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewCategory ;


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEMS_PER_PAGE = 5;

// A simple loader component
const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  
  // State for editing a row
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Ref for file input to easily reset it
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://rungeenbooks.onrender.com/api/categories/get-category');
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = (id) => {
    // This is a local state change as per the original code. 
    // For a real-world app, this would likely be an API call.
    setCategories(prev =>
      prev.map(cat =>
        cat._id === id
          ? { ...cat, status: cat.status === 'active' ? 'inactive' : 'active' }
          : cat
      )
    );
    toast.info("Status toggled locally. Note: This change is not saved to the server.");
  };

  const handleEdit = (id, currentName, currentImageUrl) => {
    setEditId(id);
    setEditName(currentName);
    setImagePreview(currentImageUrl); // Show current image on edit start
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditName('');
    setEditImage(null);
    setImagePreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveEdit = async (id) => {
    if (!editName.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append('name', editName);
    
    // Only append the image if a new one has been selected
    if (editImage) {
      formData.append('images', editImage);
    }

    try {
      await axios.put(`https://rungeenbooks.onrender.com/api/categories/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Category updated successfully!');
      handleCancelEdit(); // Reset edit state
      fetchCategories(); // Refresh data from server
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(error.response?.data?.message || 'Error updating category.');
    }
  };

  const handleDelete = async (id) => {
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
        try {
          await axios.delete(`https://rungeenbooks.onrender.com/api/categories/delete/${id}`);
          toast.success('Category deleted successfully!');
          fetchCategories();
        }
        catch(error){
          console.error('Error deleting category:',error);
          toast.error(error.response?.data?.message || 'Failed to delete category.');
        }
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📁 View Categories</h2>

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

          {isLoading ? (
            <Loader />
          ) : (
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
                        {editId === category._id ? (
                          <div className="flex flex-col items-center space-y-2">
                             <img
                              src={imagePreview || category.images?.[0]?.url || '/placeholder.jpg'}
                              alt="Preview"
                              className="w-14 h-14 object-cover rounded border border-gray-300 shadow-sm"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              ref={fileInputRef}
                              onChange={handleImageChange}
                              className="text-xs w-full max-w-[150px]"
                            />
                            npm run dev 
                            
                          </div>
                        ) : (
                          <img 
                          src={category.images?.[0]?.url || '/placeholder.jpg'}
                          alt={category.name}
               className="w-14 h-14 object-cover rounded border border-gray-300 shadow-sm "
                          />

                        )}
                      </td>

                      <td className="py-4 px-4 font-medium text-gray-900">
                        {editId === category._id ? (
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        ) : (
                          category.name
                        )}
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
                          {editId === category._id ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(category._id)}
                                className="text-green-600 hover:text-green-800"
                                title="Save"
                              >
                                <Save size={18} />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-gray-500 hover:text-gray-700"
                                title="Cancel"
                              >
                                <X size={18} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(category._id, category.name, category.images?.[0]?.url)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Edit"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(category._id)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedCategories.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan="4" className="py-6 text-center text-gray-500">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && !isLoading && (
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
    </>
  );
};

export default ViewCategory;

