import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthorInfo = () => {
  const [author, setAuthor] = useState(null);
  const [formData, setFormData] = useState({ name: "", info: "", profile: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch author details
  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.get(
          "https://rungeensingh.in/api/author-info/get"
        );
        if (res.data.success && res.data.authors.length > 0) {
          const authorData = res.data.authors[0];
          setAuthor(authorData);
          setFormData({
            name: authorData.name,
            info: authorData.info,
            profile: authorData.profile,
          });
          setPreviewImage(authorData.profile);
        }
      } catch (err) {
        console.error("Error fetching author info", err);
      }
    };
    fetchAuthor();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "your_preset"); // Change to your preset

      axios
        .post(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          uploadData
        )
        .then((res) => {
          setFormData({ ...formData, profile: res.data.secure_url });
        })
        .catch((err) => console.error("Image upload failed", err));
    }
  };

  // Update author info
  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.patch(
        "https://rungeensingh.in/api/author-info/update/68870a2a4ee9b4509d08dd81",
        formData
      );
      setAuthor(formData);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating author info", err);
    } finally {
      setLoading(false);
    }
  };

  if (!author) {
    return <div className="p-6 text-gray-600">Loading author info...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Admin Profile</h1>

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center max-w-md mx-auto">
        <img
          src={author.profile}
          alt={author.name}
          className="w-32 h-32 rounded-full border-4 border-blue-100 object-cover mb-4"
        />
        <h2 className="text-xl font-semibold">{author.name}</h2>
        <a
          href={author.info}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {author.info}
        </a>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit Info
        </button>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative border">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg"
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Author Info</h2>

            {/* Image Upload with Preview */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={previewImage || author.profile}
                alt="Preview"
                className="w-24 h-24 rounded-full border object-cover mb-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-gray-500"
              />
            </div>

            {/* Name Input */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-2"
              placeholder="Author Name"
            />

            {/* Info URL Input */}
            <input
              type="text"
              name="info"
              value={formData.info}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              placeholder="Info URL"
            />

            {/* Save Button */}
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorInfo;
