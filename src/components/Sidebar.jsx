import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Sidebar = () => {
  const [currentOpen, setCurrentOpen] = useState(null); // 'category', 'book', or null

  const handleToggle = (section) => {
    setCurrentOpen(prev => (prev === section ? null : section));
  };

  const activeClass =
    'block px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold';
  const inactiveClass =
    'block px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-700 text-gray-700';

  return (
    <aside className="w-64 bg-white text-gray-800 min-h-screen p-6 border-r border-gray-200 shadow-md">
      {/* Logo and Title */}
      <div className="mb-8 flex items-center space-x-3">
        <img src={logo} alt="Rangin Logo" className="h-10 object-contain" />
        <span className="text-xl font-bold text-blue-600">Rungeen Singh</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-3">
        <NavLink
          to="/DashCompo"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Dashboard
        </NavLink>
{/* Category Dropdown */}
<div>
  <button
    onClick={() => handleToggle('category')}
    className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-700 text-gray-700 font-medium focus:outline-none"
  >
    <span>Category</span>
    {currentOpen === 'category' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
  </button>
  {currentOpen === 'category' && (
    <div className="ml-4 mt-2 space-y-2">
      <NavLink
        to="/AddCategory"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        Add New Category
      </NavLink>
      <NavLink
        to="/ViewCategory"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        View Category
      </NavLink>
   
    </div>
  )}
</div>

{/* Book Dropdown */}
<div>
  <button
    onClick={() => handleToggle('book')}
    className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-700 text-gray-700 font-medium focus:outline-none"
  >
    <span>Book</span>
    {currentOpen === 'book' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
  </button>
  {currentOpen === 'book' && (
    <div className="ml-4 mt-2 space-y-2">
      <NavLink
        to="/Addbook"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        Add Book
      </NavLink>
      <NavLink
        to="/Viewbook"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        View Book
      </NavLink>
    </div>
  )}
</div>

<NavLink
  to="/Review"
  className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
>
  Reviews
</NavLink>

<NavLink
  to="/Orders"
  className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
>
  Orders
</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
