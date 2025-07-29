import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Pencil, Trash2, Power, PowerOff,
  BookOpen, Globe, Heart, Star, FileText
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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

// --- Main Component ---

const ViewBook = () => {
  // State Management
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState(null); // **FIX:** We only need ONE author, not a list.
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Loading and Error States
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isBooksLoading, setIsBooksLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Modal State
  const [modalState, setModalState] = useState({ isOpen: false, bookId: null, action: null });

  // --- Data Fetching ---

  // **FIX:** Fetch categories and the SINGLE author on initial load.
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
        
        // **CRITICAL FIX:** Get the first (and only) author from the list.
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

  // Fetch books when a category is selected.
  useEffect(() => {
    // Don't fetch if category isn't selected OR if the author data isn't ready yet.
    if (!selectedCategory || !author) {
      setBooks([]);
      return;
    }

    const fetchBooks = async () => {
      setIsBooksLoading(true);
      setError('');
      try {
        const response = await axios.get(`${API_BASE_URL}/books/get-books/category/${selectedCategory}`);
        
        // **FIX:** Simply attach the single author object to every book. No lookup needed.
        const processedBooks = response.data.books.map(book => ({ 
            ...book, 
            authorDetails: author, // Attach the author object.
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
  }, [selectedCategory, author]); // Dependency on `author` ensures it's available.

  // --- Handlers (Unchanged) ---
  
  const handleModalConfirm = async () => {
    const { action, bookId } = modalState;
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
      setModalState({ isOpen: false, bookId: null, action: null });
    }
  };

  const openConfirmationModal = (bookId, action) => setModalState({ isOpen: true, bookId, action });
  const handleUpdate = (bookId) => window.location.href = `/admin/update-book/${bookId}`;


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center">
          <BookOpen className="mr-3 text-blue-500" size={28} /> Manage Books
        </h2>
        
        <ConfirmationModal 
          isOpen={modalState.isOpen}
          onCancel={() => setModalState({ isOpen: false, bookId: null, action: null })}
          onConfirm={handleModalConfirm}
          title={`Confirm ${modalState.action}`}
          message={`Are you sure you want to ${modalState.action} this book?`}
        />

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
                          {/* **FIX:** Use the `authorDetails` object we attached. */}
                          <img
                            src={book.authorDetails?.profile || 'https://via.placeholder.com/40x40.png?text=N/A'}
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
                          <button onClick={() => handleUpdate(book._id)} className="text-blue-600 hover:text-blue-800" title="Update"><Pencil size={18} /></button>
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