
// import React, { useState } from 'react';
// import axios from 'axios';

// const AddCategory = () => {
//   const [name, setName] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);  // show add click loader 
//   const [successMessage, setSuccessMessage] = useState(''); 

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMessage('');

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('images', imageFile);

//     try {
//       const response = await axios.post(
//         'https://rungeensingh.onrender.com/api/categories/add-category',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       setName('');
//       setImageFile(null);
//       setPreview(null);
//       setSuccessMessage(' Category added successfully!'); 

//       // it will  auto-hide mssg  after 3 sec
//       setTimeout(() => setSuccessMessage(''), 3000);
//     } catch (error) {
//       console.error('Error adding category:', error);
//       alert('Something went wrong!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-8">
//       <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Category</h2>

//         {successMessage && (
//           <div className="mb-4 text-green-600 font-medium bg-green-100 p-3 rounded-md border border-green-300">
//             {successMessage}
//           </div>
//         )}

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
//               placeholder="e.g. Design, Finance, AI"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Upload Category Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               required
//               className="text-sm text-gray-600"
//             />
//             {preview && (
//               <div className="mt-4">
//                 <img
//                   src={preview}
//                   alt="Category Preview"
//                   className="w-32 h-32 object-cover rounded border border-gray-300 shadow-sm"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-2 rounded-md text-sm font-medium transition 
//                 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
//             >
//               {loading ? 'Adding...' : 'Add Category'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;



import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);  // show add click loader 
  const [successMessage, setSuccessMessage] = useState(''); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('images', imageFile);

    try {
      const response = await axios.post(
        'https://rungeensingh.onrender.com/api/categories/add-category',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setName('');
      setImageFile(null);
      setPreview(null);
      setSuccessMessage(' Category added successfully!'); 

      // it will  auto-hide mssg  after 3 sec
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Category</h2>

        {successMessage && (
          <div className="mb-4 text-green-600 font-medium bg-green-100 p-3 rounded-md border border-green-300">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. Design, Finance, AI"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="text-sm text-gray-600"
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Category Preview"
                  className="w-32 h-32 object-cover rounded border border-gray-300 shadow-sm"
                />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-sm font-medium transition 
                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;