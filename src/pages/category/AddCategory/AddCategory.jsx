import React, { useState } from 'react';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', imageFile);
    // TODO: Handle submit
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6"> Add New Category</h2>

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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
