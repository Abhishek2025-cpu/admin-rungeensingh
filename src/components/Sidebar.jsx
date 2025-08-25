import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Home,
  Layers,
  BookOpen,
  Star,
  ShoppingCart,
  Send,
  Bell,
  Mail,
  User,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [currentOpen, setCurrentOpen] = useState(null); // dropdown state
  const [isOpen, setIsOpen] = useState(true); // sidebar open/close state

  const handleToggle = (section) => {
    setCurrentOpen((prev) => (prev === section ? null : section));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/"); // back to login
  };

  const activeClass =
    "flex items-center gap-3 px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold";
  const inactiveClass =
    "flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-700 text-gray-700";

  return (
    <>
      {/* Toggle Button for Mobile */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-2 rounded shadow"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white text-gray-800 border-r border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo & Close button */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Rangin Logo" className="h-10 object-contain" />
            <span className="text-xl font-bold text-blue-600">
              Rungeen Singh
            </span>
          </div>
          <button
            className="md:hidden text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-3 p-6 overflow-y-auto">
          {/* Admin Profile */}
          <NavLink
            to="/AuthorInfo"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <User size={18} /> Author Info
          </NavLink>

          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <Home size={18} /> Dashboard
          </NavLink>

          {/* Category Dropdown */}
          <div>
            <button
              onClick={() => handleToggle("category")}
              className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-700 text-gray-700 font-medium"
            >
              <span className="flex items-center gap-3">
                <Layers size={18} /> Category
              </span>
              {currentOpen === "category" ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {currentOpen === "category" && (
              <div className="ml-4 mt-2 space-y-2">
                <NavLink
                  to="/AddCategory"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  ➕ Add Category
                </NavLink>
                <NavLink
                  to="/ViewCategory"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  👁 View Category
                </NavLink>
              </div>
            )}
          </div>

          {/* Book Dropdown */}
          <div>
            <button
              onClick={() => handleToggle("book")}
              className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-700 text-gray-700 font-medium"
            >
              <span className="flex items-center gap-3">
                <BookOpen size={18} /> Book
              </span>
              {currentOpen === "book" ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {currentOpen === "book" && (
              <div className="ml-4 mt-2 space-y-2">
                <NavLink
                  to="/Addbook"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  ➕ Add Book
                </NavLink>
                <NavLink
                  to="/Viewbook"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  👁 View Book
                </NavLink>
              </div>
            )}
          </div>

          {/* Reviews */}
          {/* <NavLink
            to="/Review"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <Star size={18} /> Reviews
          </NavLink> */}

          {/* Orders */}
          <NavLink
            to="/Orders"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <ShoppingCart size={18} /> Orders
          </NavLink>

          {/* Extra Items */}
          <NavLink
            to="/smtp-settings"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <Send size={18} /> SMTP Settings
          </NavLink>
          {/* <NavLink
            to="/push-notifications"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <Bell size={18} /> Push Notifications
          </NavLink> */}
          {/* <NavLink
            to="/newsletters"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <Mail size={18} /> Newsletters
          </NavLink> */}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 mt-6 px-4 py-2 text-left rounded bg-red-100 text-red-600 hover:bg-red-200 font-semibold"
          >
          
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
