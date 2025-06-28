// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpdateCategory = () => {
//   const [name, setName] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // Optional: fetch existing data here if needed

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     if (imageFile) {
//       formData.append('images', imageFile);
//     }

//     try {
//       const response = await axios.put(
//         'https://rungeensingh.onrender.com/api/categories/update/68402400ad55fc2d2d82e4b0',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       alert('Category updated successfully!');
//       setName('');
//       setImageFile(null);
//       setPreview(null);
//     } catch (error) {
//       console.error('Error updating category:', error);
//       alert('Failed to update category');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-8">
//       <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Category</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category Name
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//               placeholder="e.g. Updated Name"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Upload New Image (Optional)
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="text-sm text-gray-600"
//             />
//             {preview && (
//               <div className="mt-4">
//                 <img
//                   src={preview}
//                   alt="Preview"
//                   className="w-32 h-32 object-cover rounded border border-gray-300 shadow-sm"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition"
//             >
//               Update Category
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateCategory;

// get api 

// src/pages/category/AddCategory/CategoryList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch category data from the API
    axios
      .get("https://rungeensingh.onrender.com/api/categories/get-category")
      .then((response) => {
        setCategories(response.data); // Adjust if response is wrapped
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading categories...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Category List</h2>
      <ul className="list-disc ml-6">
        {categories.map((category) => (
          <li key={category._id || category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
