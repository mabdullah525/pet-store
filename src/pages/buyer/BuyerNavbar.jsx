import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useFirebase } from "../../context/Firebase.jsx";
import { User, LogOut, ChevronDown } from "lucide-react";

const BuyerNavbar = () => {
  const { logoutUser, user } = useFirebase();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* 🐾 Left Section - Logo */}
      <Link
        to="/buyer-dashboard"
        className="flex items-center gap-2 text-xl font-bold text-blue-600"
      >
        🐾 <span>PetStore</span>
      </Link>

      {/* 🔗 Center Links */}
      <div className="hidden md:flex gap-6 text-gray-700 font-medium">
        <NavLink
          to="/buyer-dashboard"
          end
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/all-pets"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
          }
        >
          Browse Pets
        </NavLink>

        <NavLink
          to="/my-orders"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
          }
        >
          Cart
        </NavLink>
      </div>

      {/* 👤 Right Section - Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition"
        >
          <User size={20} />
          <ChevronDown size={16} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              {user?.email || "No email"}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BuyerNavbar;
