import React, { useState, useEffect, useMemo } from 'react';

// A simple SVG spinner for the loading state (no changes here)
const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-gray-600">Loading Orders...</span>
    </div>
);

const Orders = () => {
    // State for orders, loading, and errors
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // NEW: State for search query and current page
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5; // You can adjust this number

    // The API endpoint and base URL
    const API_URL = 'https://rungeensingh.in/api/orders/user/685100b3db952d9f7787b320';
    const BASE_IMAGE_URL = 'https://rungeensingh.in';

    // Fetch data when the component first renders
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Failed to fetch data.');
                const data = await response.json();
                if (data.success && Array.isArray(data.orders)) {
                    setOrders(data.orders);
                } else {
                    throw new Error(data.message || 'Could not find any orders.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
    
    // NEW: Memoize the filtering logic so it only runs when orders or search query changes
    const filteredOrders = useMemo(() => {
        if (!searchQuery) {
            return orders;
        }
        return orders.filter(order => 
            order.book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.book.authorId.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [orders, searchQuery]);

    // NEW: Reset to page 1 whenever a search is performed
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // NEW: Calculate paginated data
    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredOrders, currentPage]);

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

    // Helper function to render the status badge
    const renderStatusBadge = (status) => {
        const statusColors = {
            paid: 'bg-green-100 text-green-800',
            failed: 'bg-red-100 text-red-800',
            pending: 'bg-yellow-100 text-yellow-800',
        };
        const colorClasses = statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
        return (
            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses}`}>
                {status}
            </span>
        );
    };

    const renderContent = () => {
        if (loading) return <LoadingSpinner />;
        if (error) return (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4 rounded-md" role="alert">
                <p className="font-bold">An Error Occurred</p><p>{error}</p>
            </div>
        );
        if (orders.length === 0) return (
            <div className="text-center py-12"><h3 className="text-lg font-medium text-gray-800">No Orders Found</h3></div>
        );
        if (paginatedOrders.length === 0) return (
            <div className="text-center py-12"><h3 className="text-lg font-medium text-gray-800">No Results Found</h3><p className="mt-1 text-sm text-gray-500">Try adjusting your search.</p></div>
        );

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                            {/* NEW: Customer Column */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-14 w-10 rounded-md object-cover flex-shrink-0" src={`${BASE_IMAGE_URL}${order.book.coverImage}`} alt={order.book.name} />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{order.book.name}</div>
                                            <div className="text-sm text-gray-500">{order.book.authorId.name}</div>
                                        </div>
                                    </div>
                                </td>
                                {/* NEW: Customer Data */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{order.user.firstname}</div>
                                    <div className="text-sm text-gray-500">{order.user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{order.amount} {order.currency}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{renderStatusBadge(order.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
                    <p className="mt-2 text-sm text-gray-600">Browse and manage all book purchases.</p>
                </div>

                {/* NEW: Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by book or author..."
                        className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                    />
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {renderContent()}
                </div>

                {/* NEW: Pagination Controls */}
                {filteredOrders.length > ITEMS_PER_PAGE && (
                    <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-b-xl shadow-lg">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Previous</button>
                            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)}</span> of{' '}
                                    <span className="font-medium">{filteredOrders.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                                        Previous
                                    </button>
                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;