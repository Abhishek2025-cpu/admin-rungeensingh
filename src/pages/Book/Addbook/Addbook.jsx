import React, { useState } from 'react'

const Addbook = () => {
  const [bookName, setBookName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('');
    const [cover, setCover] = useState(null);
    const [bookFile, setBookFile] = useState(null);
    const [preview, setPreview] = useState(null);
  
    const handleCoverChange = (e) => {
      const file = e.target.files[0];
      setCover(file);
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    };
  
    // const token = localStorage.get
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("bookName", bookName);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("cost", cost);
      formData.append("category", category);
      formData.append("cover", cover);
      formData.append("bookFile", bookFile);
  
      // try {
      //   const response = await axios.post(`https://rungeenApp.ddns.net/admin/book`, formData, {
      //     headers: {
      //       Authorization: "",
      //       Content-Type: "multipart/form-data",
      //     },
      //   });
      //   alert("Book uploaded successfully!");
      //   console.log(response.data);
      // } catch (error) {
      //   alert("Error uploading book.");
      //   console.error(error);
      // }
    };
  
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Book</h2>
  
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Book Name</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
  
          <div>
            <label className="block mb-1 font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
  
          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
  
          <div>
            <label className="block mb-1 font-medium text-gray-700">Cost</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
  
          <div>
            <label className="block mb-1 font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
  
          <div>
            <label className="block mb-1 font-medium text-gray-700">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              required
              className="block w-full text-sm text-gray-600"
            />
            {preview && (
              <img
                src={preview}
                alt="Cover Preview"
                className="mt-4 w-40 h-56 object-cover rounded border border-gray-200 shadow"
              />
            )}
          </div>
  
          <div>
            <label className="block mb-1 font-medium text-gray-700">Book File (PDF/ePub)</label>
            <input
              type="file"
              accept=".pdf,.epub"
              onChange={(e) => setBookFile(e.target.files[0])}
              required
              className="block w-full text-sm text-gray-600"
            />
          </div>
  
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
            >
              Upload Book
            </button>
          </div>
        </form>
      </div>
    );
}

export default Addbook