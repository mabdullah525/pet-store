import React from "react";
import { Search, ShoppingCart, Bell, User } from "lucide-react";

const Topbar = () => {
  return (
    <header className="topbar">
      {/* Logo */}
      <div className="logo text-2xl font-bold text-gray-800 flex items-center gap-2">
        🐾 <span>PetStore</span>
      </div>

      {/* Search Bar */}
      <div className="search-bar relative w-1/2">
        <input
          type="text"
          placeholder="Search for products..."
          className="search-input"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      </div>

      {/* Icons */}
      <div className="icons flex items-center gap-4">
        <button className="icon-btn">
          <ShoppingCart size={20} />
        </button>
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <button className="icon-btn">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
