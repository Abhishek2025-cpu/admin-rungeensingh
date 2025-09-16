import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Pencil, Trash2, Power, PowerOff,
  BookOpen, Globe, Heart, Star, FileText, X
} from 'lucide-react';

// --- Constants ---
const API_BASE_URL = 'https://rungeensingh.in/api';
const ASSET_BASE_URL = 'https://rungeensingh.in';

// --- Reusable Components (Unchanged) ---

const Loader = ({ message = "Loading..." }) => (
  <div className="flex flex-col justify-center items-center py-20 text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    <p className="mt-4 text-gray-600">{message}</p>
  </div>
);

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.round(rating || 0);
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => (
        <Star key={i} size={16} className={i < fullStars ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
      ))}
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Confirm</button>
        </div>
      </div>
    </div>
  );
};

// --- UPDATED Update Book Modal Component ---
const UpdateBookModal = ({ isOpen, onClose, book, categories, author, onBookUpdated }) => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    about: '',
    price: 0,
    pdf: null, // File object
    coverImage: null, // File object
    authorId: '', // Will be set from the author prop
    isFree: false,
    language: '',
  });
  const [currentCoverImage, setCurrentCoverImage] = useState(''); // To display current image
  const [currentPdfName, setCurrentPdfName] = useState(''); // To display current PDF
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen && book) {
      setFormData({
        category: book.category?._id || '',
        name: book.name || '',
        about: book.about || '',
        price: book.price || 0,
        pdf: null, // Reset file inputs
        coverImage: null, // Reset file inputs
        authorId: author?._id || '', // Use the author prop passed from ViewBook
        isFree: book.isFree || false,
        language: book.language || '',
      });
      setCurrentCoverImage(book.coverImage ? `${ASSET_BASE_URL}${book.coverImage}` : '');
      setCurrentPdfName(book.pdfUrl ? book.pdfUrl.split('/').pop() : ''); // Extract filename
      setError('');
      setSuccess('');
    }
  }, [isOpen, book, author]);

  if (!isOpen || !book || !author) return null; // Ensure book and author are available

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0] || null, // Take the first file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      // Append all form data fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });
      
      // Special handling for price and isFree to ensure correct types for backend if needed
      data.set('price', formData.price.toString());
      data.set('isFree', formData.isFree.toString());

      const response = await axios.put(`${API_BASE_URL}/books/update/${book._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Book updated successfully!');
      onBookUpdated(response.data.book); // Notify parent component to update the list
      setTimeout(onClose, 1500); // Close modal after a short delay
    } catch (err) {
      console.error("Error updating book:", err.response ? err.response.data : err);
      setError('Failed to update book. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // The outer div now correctly handles overflow for the entire screen
    // `fade-in` class for a smoother appearance (define in your CSS)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto animate-fade-in">
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl relative my-4 
                   max-h-[calc(100vh-theme(spacing.8))] overflow-y-auto" // Optimized height
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          title="Close"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Update Book: {book.name}</h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Book Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">About</label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="isFree"
              name="isFree"
              type="checkbox"
              checked={formData.isFree}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isFree" className="ml-2 block text-sm text-gray-900">Is Free?</label>
          </div>
          
          {/* Cover Image Input */}
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image</label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {currentCoverImage && !formData.coverImage && (
              <p className="mt-2 text-sm text-gray-500">
                Current Image: <a href={currentCoverImage} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a>
              </p>
            )}
            {formData.coverImage && (
                <p className="mt-2 text-sm text-gray-500">New image selected: {formData.coverImage.name}</p>
            )}
          </div>

          {/* PDF Input */}
          <div>
            <label htmlFor="pdf" className="block text-sm font-medium text-gray-700">PDF File</label>
            <input
              type="file"
              id="pdf"
              name="pdf"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {currentPdfName && !formData.pdf && (
                <p className="mt-2 text-sm text-gray-500">Current PDF: <a href={book.fullPdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{currentPdfName}</a></p>
            )}
            {formData.pdf && (
                <p className="mt-2 text-sm text-gray-500">New PDF selected: {formData.pdf.name}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Main ViewBook Component (No changes needed here for the modal fix) ---

const ViewBook = () => {
  // State Management
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Loading and Error States
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isBooksLoading, setIsBooksLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Modal State for Confirmation (delete/toggle)
  const [confirmationModalState, setConfirmationModalState] = useState({ isOpen: false, bookId: null, action: null });

  // --- NEW: State for Update Book Modal ---
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [bookToUpdate, setBookToUpdate] = useState(null); // Stores the book object to pass to the modal

  // --- Data Fetching ---

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsInitialLoading(true);
      setError('');
      try {
        const [categoriesResponse, authorResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/categories/get-category`),
          axios.get(`${API_BASE_URL}/author-info/get`)
        ]);
        
        setCategories(categoriesResponse.data || []);
        
        if (authorResponse.data.authors && authorResponse.data.authors.length > 0) {
          setAuthor(authorResponse.data.authors[0]);
        }

      } catch (err) {
        setError('Failed to load initial data. Please refresh the page.');
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!selectedCategory || !author) {
      setBooks([]);
      return;
    }

    const fetchBooks = async () => {
      setIsBooksLoading(true);
      setError('');
      try {
        const response = await axios.get(`${API_BASE_URL}/books/get-books/category/${selectedCategory}`);
        
        const processedBooks = response.data.books.map(book => ({ 
            ...book, 
            authorDetails: author,
            fullCoverImageUrl: book.coverImage ? `${ASSET_BASE_URL}${book.coverImage}` : null,
            fullPdfUrl: book.pdfUrl ? `${ASSET_BASE_URL}${book.pdfUrl}` : null
        }));

        setBooks(processedBooks);
      } catch (err) {
        setError('Failed to load books for this category.');
        setBooks([]);
      } finally {
        setIsBooksLoading(false);
      }
    };

    fetchBooks();
  }, [selectedCategory, author]);

  // --- Handlers ---
  
  const handleConfirmationModalConfirm = async () => {
    const { action, bookId } = confirmationModalState;
    if (!action || !bookId) return;
    try {
      if (action === 'delete') {
        await axios.delete(`${API_BASE_URL}/books/delete/${bookId}`);
        setBooks(prevBooks => prevBooks.filter(b => b._id !== bookId));
      } else if (action === 'toggle') {
        await axios.patch(`${API_BASE_URL}/books/toggle/${bookId}`);
        setBooks(prevBooks => prevBooks.map(b => b._id === bookId ? { ...b, status: !b.status } : b));
      }
    } catch (err) {
      setError(`Failed to perform action: ${action}. Please try again.`);
    } finally {
      setConfirmationModalState({ isOpen: false, bookId: null, action: null });
    }
  };

  const openConfirmationModal = (bookId, action) => setConfirmationModalState({ isOpen: true, bookId, action });
  
  // --- NEW: Handle opening the update modal ---
  const handleUpdate = (book) => {
    setBookToUpdate(book); // Set the book object to be edited
    setIsUpdateModalOpen(true); // Open the modal
  };

  // --- NEW: Handle book update from modal ---
  const handleBookUpdated = (updatedBook) => {
    // Find the updated book in the list and replace it
    setBooks(prevBooks => prevBooks.map(book => 
      book._id === updatedBook._id 
        ? { 
            ...updatedBook, 
            authorDetails: author, // Re-attach author details
            fullCoverImageUrl: updatedBook.coverImage ? `${ASSET_BASE_URL}${updatedBook.coverImage}` : null,
            fullPdfUrl: updatedBook.pdfUrl ? `${ASSET_BASE_URL}${updatedBook.pdfUrl}` : null
          } 
        : book
    ));
    // Also update categories if the category changed
    if (updatedBook.category && !categories.some(cat => cat._id === updatedBook.category._id)) {
        // If the category was new or changed to one not in the list, you might need to re-fetch categories or add it.
        // For simplicity, we assume categories are pre-loaded and won't change often.
        // If a book's category *was* updated, the backend should return the updated book object
        // where `category` would either be an ID or a populated object. We ensure our local `book` object 
        // also gets its category name updated by making sure the `category` property is a populated object.
        // A simple way to handle this is to re-fetch the books for the current category, 
        // or ensure the backend returns the full category object if it was changed.
        // For now, if the updatedBook.category is just an ID, we populate it here.
        const categoryObject = categories.find(cat => cat._id === updatedBook.category);
        if (categoryObject) {
             setBooks(prevBooks => prevBooks.map(book => 
                book._id === updatedBook._id 
                    ? { ...book, category: categoryObject } 
                    : book
            ));
        }
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center">
          <BookOpen className="mr-3 text-blue-500" size={28} /> Manage Books
        </h2>
        
        {/* Confirmation Modal (for delete/toggle) */}
        <ConfirmationModal 
          isOpen={confirmationModalState.isOpen}
          onCancel={() => setConfirmationModalState({ isOpen: false, bookId: null, action: null })}
          onConfirm={handleConfirmationModalConfirm}
          title={`Confirm ${confirmationModalState.action === 'delete' ? 'Deletion' : 'Status Change'}`}
          message={`Are you sure you want to ${confirmationModalState.action} this book?`}
        />

        {/* --- NEW: Update Book Modal Instance --- */}
        {isUpdateModalOpen && bookToUpdate && (
          <UpdateBookModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            book={bookToUpdate}
            categories={categories}
            author={author} // Pass the single author object
            onBookUpdated={handleBookUpdated}
          />
        )}


        {isInitialLoading ? (
          <Loader message="Loading initial data..." />
        ) : (
          <div className="mb-8">
            <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select a Category to View Books
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={isInitialLoading}
              className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100"
            >
              <option value="">-- Choose a Category --</option>
              {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
            </select>
          </div>
        )}

        {error && <div className="text-center my-4 py-4 text-red-700 bg-red-100 rounded-lg"><p>{error}</p></div>}
        {isBooksLoading && <Loader message="Fetching books..." />}
        
        {!isBooksLoading && !error && (
            <>
                {!selectedCategory && <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg"><p>Please select a category to begin.</p></div>}
                {selectedCategory && books.length === 0 && <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg"><p>No books found in this category.</p></div>}
            </>
        )}
        
        {!isBooksLoading && !error && books.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-800">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600 border-b">
                 <tr>
                  <th className="py-3 px-4 text-left">Book</th>
                  <th className="py-3 px-4 text-left">Author</th>
                  <th className="py-3 px-4 text-left">Stats</th>
                  <th className="py-3 px-4 text-left">Created</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {books.map((book) => (
                    <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={book.fullCoverImageUrl || 'https://via.placeholder.com/50x70.png?text=No+Img'}
                            alt={book.name}
                            className="w-12 h-16 object-cover rounded-md border border-gray-200 shadow-sm"
                          />
                          <span className="font-semibold text-gray-900">{book.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={book.authorDetails?.profile ? `${ASSET_BASE_URL}${book.authorDetails.profile}` : 'https://via.placeholder.com/40x40.png?text=N/A'}
                            alt={book.authorDetails?.name || 'Author'}
                            className="w-10 h-10 object-cover rounded-full border border-gray-200"
                          />
                          <span>{book.authorDetails?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col space-y-2 text-xs">
                          <div className="flex items-center space-x-1.5 text-gray-600"><Globe size={14} /> <span>{book.language}</span></div>
                          <div className="flex items-center space-x-1.5 text-gray-600"><Heart size={14} className="text-red-500" /> <span>{book.likesCount || 0} Likes</span></div>
                          <div className="flex items-center space-x-1.5 text-gray-600"><StarRating rating={book.averageRating} /></div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(book.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${book.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {book.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center items-center space-x-2">
                          {book.fullPdfUrl && (
                            <a href={book.fullPdfUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800" title="View PDF">
                              <FileText size={18} />
                            </a>
                          )}
                          {/* --- CHANGED: Call handleUpdate with the book object --- */}
                          <button onClick={() => handleUpdate(book)} className="text-blue-600 hover:text-blue-800" title="Update"><Pencil size={18} /></button>
                          <button onClick={() => openConfirmationModal(book._id, 'delete')} className="text-red-600 hover:text-red-800" title="Delete"><Trash2 size={18} /></button>
                          <button onClick={() => openConfirmationModal(book._id, 'toggle')} className={`transition ${book.status ? 'text-gray-500 hover:text-gray-700' : 'text-green-500 hover:text-green-700'}`} title={book.status ? 'Deactivate' : 'Activate'}>
                            {book.status ? <PowerOff size={18} /> : <Power size={18} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBook;