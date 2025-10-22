import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  PlusCircle,
  List,
  LogOut,
  PawPrint,
} from "lucide-react";
import { useFirebase } from "../context/Firebase.jsx";

const Sidebar = () => {
  const { logoutUser, user } = useFirebase();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Orders", icon: <ShoppingBag size={20} />, path: "/seller-orders" },
    { name: "Add Listing", icon: <PlusCircle size={20} />, path: "/add-listing" },
    { name: "My Listings", icon: <List size={20} />, path: "/my-listings" },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-2xl p-5 flex flex-col justify-between h-screen transition-all duration-300">
      {/* 🐾 Logo + Brand */}
      <div>
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-white/20 p-2 rounded-xl">
            <PawPrint size={26} />
          </div>
          <h1 className="text-2xl font-bold tracking-wide">PetStore</h1>
        </div>

        {/* 👤 User Info */}
        {user && (
          <div className="mb-8 border-b border-white/20 pb-4">
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-white/30 object-cover"
              />
              <div>
                <p className="font-semibold text-white">
                  {user.displayName || "User"}
                </p>
                <p className="text-sm text-white/70">
                  {user.email?.split("@")[0]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 🧭 Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
                ${isActive
                  ? "bg-white/25 text-white font-medium shadow-md"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <div className="transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* 🚪 Logout Button */}
      <button
        onClick={logoutUser}
        className="flex items-center justify-center gap-2 bg-white/20 text-white font-semibold py-2 rounded-lg hover:bg-red-500/90 hover:shadow-lg transition-all"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
