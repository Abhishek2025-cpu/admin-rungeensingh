import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetCategory = () => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const categoryId = '68402400ad55fc2d2d82e4b0'; // Replace with dynamic ID if needed
  const API_BASE = 'https://rungeenbooks.onrender.com/api/categories';

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${categoryId}`);
        setName(res.data.name || '');
        if (res.data.images && res.data.images[0]) {
          setPreview(res.data.images[0]); // Backend should return image URL
        }
      } catch (error) {
        console.error('Failed to fetch category:', error);
        alert('❌ Failed to load category data');
      }
    };
 

    fetchCategory();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setLoading(true);

    const formData =new FormData();
    formData.append('name',name);
    if(imageFile){
      formData.append('image,imageFile');

    }
    try {
      const response = await axios.put(`${API_BASE}/update/${categoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data?.message) {
        alert('✅ ' + response.data.message);
        setName('');
        setImageFile(null);
        setPreview(null);
      } else {
        alert('❌ Unexpected response from server');
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert('❌ Failed to update category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Category</h2>

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
              placeholder="e.g. Updated Name"
            />
          </div>

          <div className="md:col-span-2">

            <lable className="block text-sm font-medium text-gray-700 mb-1" >
              Upload New Image (Optional)
            </lable>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-600"
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border border-gray-300 shadow-sm"
                />
              </div>
            )}
          </div>

    
      

          <div className="md:col-span-2">
            {/* <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
              } text-white py-2 rounded-md text-sm font-medium transition`}
            >
              {loading ? 'Updating...' : 'Update Category'}
            </button> */}
            <button 
            type ="submit"
            disabled={loading}
            className={`w-full${
              loading ? 'bg-gray-400':'bg-green-600 hover:bg-green-700'
            }text-white py-2 rounded-md text-sm font-medium transition`}
             >
             { loading ? 'Updating...' : 'Update Category'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetCategory;