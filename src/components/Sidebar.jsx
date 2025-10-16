import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  PlusCircle,
  List,
  LogOut,
} from "lucide-react";
import { useFirebase } from "../context/Firebase.jsx";

const Sidebar = () => {
  const { logoutUser } = useFirebase();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Orders", icon: <ShoppingBag size={20} />, path: "/seller-orders" },
    { name: "Add Listing", icon: <PlusCircle size={20} />, path: "/add-listing" },
    { name: "My Listings", icon: <List size={20} />, path: "/my-listings" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-5 flex flex-col justify-between h-screen">
      {/* ✅ Menu List */}
      <nav className="space-y-2">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* 🔹 Logout Button */}
      <button
        onClick={logoutUser}
        className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700 mt-4"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
