import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  PlusCircle,
  User,
  LogOut,
  List,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "My Orders", icon: <ShoppingBag size={20} />, path: "/orders" },
    { name: "Add Listing", icon: <PlusCircle size={20} />, path: "/add-listing" },
    { name: "My Listings", icon: <List size={20} />, path: "/my-listings" }, // ✅ NEW TAB
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
    </aside>
  );
};

export default Sidebar;
