import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  // ✅ useEffect for preview cleanup
  useEffect(() => {
    // Cleanup function to revoke preview when component unmounts or preview changes
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (!imageFile) {
      setErrorMessage('Please select an image.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('images', imageFile); // use 'image' if your backend expects that

    try {
      const response = await axios.post(
        'https://rungeenbooks.onrender.com/api/categories/add-category',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('✅ Category added successfully!');
        setName('');
        setImageFile(null);
        setPreview(null);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('❌ Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setErrorMessage('❌ Something went wrong! Please try again.');
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

        {errorMessage && (
          <div className="mb-4 text-red-600 font-medium bg-red-100 p-3 rounded-md border border-red-300">
            {errorMessage}
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
              className={`w-full py-2 rounded-md text-sm font-medium transition ${
                loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryList;