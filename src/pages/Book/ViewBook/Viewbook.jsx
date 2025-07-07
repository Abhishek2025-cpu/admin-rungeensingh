import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Pencil, Trash2, Power, PowerOff, 
  BookOpen, UserCircle, Globe, Heart, Star, FileText 
} from 'lucide-react';

// A simple loader component
const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Helper component to render star ratings
const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.round(rating || 0);
  
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < fullStars ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />
      ))}
    </div>
  );
};

// Helper function to parse the inconsistent PDF URL format
const parsePdfUrl = (pdfArray) => {
    if (!pdfArray || pdfArray.length === 0) return null;
    const pdfData = pdfArray[0];

    // Case 1: The URL is directly available
    if (pdfData.url) return pdfData.url;

    // Case 2: The URL is stored as a character map
    if (typeof pdfData === 'object' && pdfData !== null) {
        // Filter for numeric keys, sort them, and reconstruct the string
        const url = Object.keys(pdfData)
            .filter(key => !isNaN(parseInt(key))) // Ensure key is a number-like string
            .sort((a, b) => parseInt(a) - parseInt(b)) // Sort keys numerically
            .map(key => pdfData[key])
            .join('');
        // A simple validation to ensure it's a URL-like string
        if (url.startsWith('http')) return url;
    }
    return null;
};


const ViewBook = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://rungeenbooks.onrender.com/api/categories/get-category');
        setCategories(response.data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories.');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setBooks([]);
      return;
    }
    const fetchBooks = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.get(`https://rungeenbooks.onrender.com/api/books/get-books/category/${selectedCategory}`);
        setBooks(response.data.books || []);
      } catch (err) {
        console.error(`Error fetching books for category ${selectedCategory}:`, err);
        setError('Failed to load books for this category.');
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleUpdate = (bookId) => console.log('Update book:', bookId);
  const handleDelete = (bookId) => console.log('Delete book:', bookId);
  const handleToggleStatus = (bookId, status) => console.log(`Toggle status for book: ${bookId} from ${status}`);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center">
          <BookOpen className="mr-3 text-blue-500" size={28} /> Manage Books
        </h2>
        
        <div className="mb-8">
          <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select a Category to View Books
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">-- Choose a Category --</option>
            {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
        </div>

        {isLoading && <Loader />}
        {!isLoading && error && <div className="text-center py-10 text-red-500 bg-red-50 rounded-lg"><p>{error}</p></div>}
        {!isLoading && !error && !selectedCategory && <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg"><p>Please select a category to begin.</p></div>}
        {!isLoading && !error && selectedCategory && books.length === 0 && <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg"><p>No books found in this category.</p></div>}

        {!isLoading && !error && books.length > 0 && (
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
                {books.map((book) => {
                  const pdfUrl = parsePdfUrl(book.pdf);
                  return (
                    <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={book.images?.coverImage || 'https://via.placeholder.com/50x70.png?text=No+Img'}
                            alt={book.name}
                            className="w-12 h-16 object-cover rounded-md border border-gray-200 shadow-sm"
                          />
                          <span className="font-semibold text-gray-900">{book.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                           <img
                            src={book.authorDetails?.photo || 'https://via.placeholder.com/40x40.png?text=N/A'}
                            alt={book.authorDetails?.name || 'Author'}
                            className="w-10 h-10 object-cover rounded-full border border-gray-200"
                          />
                          <span>{book.authorDetails?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col space-y-2 text-xs">
                          <div className="flex items-center space-x-1.5 text-gray-600">
                            <Globe size={14} /> <span>{book.language}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-gray-600">
                            <Heart size={14} className="text-red-500" /> <span>{book.likesCount || 0} Likes</span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-gray-600">
                            <StarRating rating={book.averageRating} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(book.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${book.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {book.status || 'inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center items-center space-x-2">
                          {pdfUrl && (
                             <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800" title="View PDF">
                                <FileText size={18} />
                            </a>
                          )}
                          <button onClick={() => handleUpdate(book._id)} className="text-blue-600 hover:text-blue-800" title="Update"><Pencil size={18} /></button>
                          <button onClick={() => handleDelete(book._id)} className="text-red-600 hover:text-red-800" title="Delete"><Trash2 size={18} /></button>
                          <button onClick={() => handleToggleStatus(book._id, book.status)} className={`transition ${book.status === 'active' ? 'text-gray-500 hover:text-gray-700' : 'text-green-500 hover:text-green-700'}`} title={book.status === 'active' ? 'Deactivate' : 'Activate'}>
                            {book.status === 'active' ? <PowerOff size={18} /> : <Power size={18} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBook;