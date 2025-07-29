import React, { useState, useEffect } from 'react';
import {
  FaBook,
  FaUser,
  FaInfoCircle,
  FaLanguage,
  FaImage,
  FaFilePdf,
  FaUpload
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addbook = () => {
  const AUTHOR_ID = '68870a2a4ee9b4509d08dd81';

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [language, setLanguage] = useState('English');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(true);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://rungeensingh.in/api/categories/get-category');
        const data = await res.json();
        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        toast.error('Failed to load categories.');
      }
    };
    fetchCategories();
  }, []);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('authorId', AUTHOR_ID);
    formData.append('about', about);
    formData.append('language', language);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('isFree', isFree);
    if (coverImage) formData.append('coverImage', coverImage);
    if (pdf) formData.append('pdf', pdf);

    // 🔍 DEBUG: Log FormData contents
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    setLoading(true);
    try {
      const res = await fetch('https://rungeensingh.in/api/books/add-book', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      console.log('Server Response:', result);

      if (res.ok) {
        toast.success('Book uploaded successfully!');
        setName('');
        setAbout('');
        setLanguage('English');
        setCategory('');
        setPrice(0);
        setIsFree(true);
        setCoverImage(null);
        setPdf(null);
        setPreview(null);
      } else {
        toast.error(result?.error || 'Upload failed. Check required fields.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Something went wrong while uploading.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <ToastContainer />
      <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-700">
          <FaUpload /> Upload New Book
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <FaBook /> Book Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <FaUser /> Author ID
            </label>
            <input
              type="text"
              value={AUTHOR_ID}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <FaLanguage /> Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <FaInfoCircle /> About
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              Price ₹
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Free Book?</label>
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <FaImage /> Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              required
              className="text-sm"
            />
            {preview && (
              <img
                src={preview}
                alt="Cover Preview"
                className="mt-2 w-32 h-48 object-cover rounded border"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <FaFilePdf /> PDF File
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              required
              className="text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-md transition ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? 'Uploading...' : <><FaUpload /> Upload Book</>}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addbook;
