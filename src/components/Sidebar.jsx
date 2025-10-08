import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Heart, User, LogOut } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "My Orders", icon: <ShoppingBag size={20} />, path: "/orders" },
    { name: "Wishlist", icon: <Heart size={20} />, path: "/wishlist" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
  ];

  return (
    <aside className="sidebar">
      {/* ✅ Menu List */}
      <nav className="menu">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* ✅ Logout Button */}
      <button className="logout-btn">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
