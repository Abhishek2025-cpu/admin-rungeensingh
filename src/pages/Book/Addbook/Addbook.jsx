// import React, { useState } from 'react';
// import { FaBook, FaUser, FaInfoCircle, FaLanguage, FaImage, FaFilePdf, FaUpload } from 'react-icons/fa';

// const Addbook = () => {
//   const [bookName, setBookName] = useState('');
//   const [author, setAuthor] = useState('');
//   const [about, setAbout] = useState('');
//   const [language, setLanguage] = useState('');
//   const [category, setCategory] = useState('');
//   const [cover, setCover] = useState(null);
//   const [bookFile, setBookFile] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const handleCoverChange = (e) => {
//     const file = e.target.files[0];
//     setCover(file);
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('bookName', bookName);
//     formData.append('author', author);
//     formData.append('about', about);
//     formData.append('language', language);
//     formData.append('category', category);
//     formData.append('cover', cover);
//     formData.append('bookFile', bookFile);

//     try {
//       const response = await fetch('https://rungeenbooks.onrender.com/api/books/add-books', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         alert('Book uploaded successfully!');
//         // Clear form
//         setBookName('');
//         setAuthor('');
//         setAbout('');
//         setLanguage('');
//         setCategory('');
//         setCover(null);
//         setBookFile(null);
//         setPreview(null);
//       } else {
//         alert('Failed to upload the book. Please try again.');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       alert('Something went wrong while uploading the book.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-8">
//       <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <FaUpload className="text-blue-600" /> Upload New Book
//           </h2>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
//           >
//             <option value="">Choose Category</option>
//             <option value="Technology">Technology</option>
//             <option value="Self-help">Self-help</option>
//             <option value="Fiction">Fiction</option>
//             <option value="Finance">Finance</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
//               <FaBook /> Book Name
//             </label>
//             <input
//               type="text"
//               value={bookName}
//               onChange={(e) => setBookName(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-md text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
//               <FaUser /> Author
//             </label>
//             <input
//               type="text"
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-md text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
//               <FaLanguage /> Language
//             </label>
//             <input
//               type="text"
//               value={language}
//               onChange={(e) => setLanguage(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-md text-sm"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
//               <FaInfoCircle /> About
//             </label>
//             <textarea
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//               rows="4"
//               required
//               className="w-full px-4 py-2 border rounded-md text-sm"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
//               <FaImage /> Cover Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleCoverChange}
//               required
//               className="text-sm text-gray-600"
//             />
//             {preview && (
//               <img
//                 src={preview}
//                 alt="Cover Preview"
//                 className="mt-3 w-32 h-48 object-cover rounded border border-gray-300 shadow"
//               />
//             )}
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
//               <FaFilePdf /> Book File (PDF)
//             </label>
//             <input
//               type="file"
//               accept=".pdf"
//               onChange={(e) => setBookFile(e.target.files[0])}
//               required
//               className="text-sm text-gray-600"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <FaUpload /> Upload Book
//               </div>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addbook;
import React, { useState, useEffect } from 'react';
import {
  FaBook,
  FaUser,
  FaInfoCircle,
  FaLanguage,
  FaImage,
  FaFilePdf,
  FaUpload,
} from 'react-icons/fa';

const Addbook = () => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [about, setAbout] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCover] = useState(null);
  const [pdf, setBookFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]); // Dynamic categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://rungeenbooks.onrender.com/api/categories/get-category'
          // 'https://rungeenbooks.onrender.com/api/books/add-books'
        );
        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('bookName', bookName);
    formData.append('author', author);
    formData.append('about', about);
    formData.append('language', language);
    formData.append('category', category); // This will be category name
    formData.append('cover', cover);
    formData.append('bookFile', bookFile);

    try {
      const response = await fetch(
        'https://rungeenbooks.onrender.com/api/books/add-books',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        alert('Book uploaded successfully!');
        setBookName('');
        setAuthor('');
        setAbout('');
        setLanguage('');
        setCategory('');
        setCover(null);
        setBookFile(null);
        setPreview(null);
      } else {
        alert('Failed to upload the book. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Something went wrong while uploading the book.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaUpload className="text-blue-600" /> Upload New Book
          </h2>
          {/* <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Choose Category</option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select> */}
          <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
>
  <option value="">Choose Category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat.name}>
      {cat.name}
    </option>
  ))}
</select>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaBook /> Book Name
            </label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaUser /> Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaLanguage /> Language
            </label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaInfoCircle /> About
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="4"
              required
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaImage /> Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              required
              className="text-sm text-gray-600"
            />
            {preview && (
              <img
                src={preview}
                alt="Cover Preview"
                className="mt-3 w-32 h-48 object-cover rounded border border-gray-300 shadow"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaFilePdf /> Book File (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setBookFile(e.target.files[0])}
              required
              className="text-sm text-gray-600"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
            >
              <div className="flex items-center justify-center gap-2">
                <FaUpload /> Upload Book
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addbook;
