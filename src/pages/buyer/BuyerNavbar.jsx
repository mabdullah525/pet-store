import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/Firebase.jsx";


const BuyerNavbar = () => {
  const { logoutUser, user } = useFirebase();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav className="buyer-navbar">
      {/* 🐾 Left Section - Logo */}
      <Link to="/buyer-dashboard" className="buyer-logo">
        🐾 <span>PetStore</span>
      </Link>

      {/* 🔗 Center Links */}
      <div className="buyer-nav-links">
        <Link to="/buyer-dashboard">Dashboard</Link>
        <Link to="/all-pets">Browse Pets</Link>
        <Link to="/my-orders">Cart</Link>
      </div>

      {/* 👤 Right Section - Email + Logout */}
      <div className="flex items-center gap-4">
        <span className="buyer-email">{user?.email}</span>
        <button onClick={handleLogout} className="buyer-logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default BuyerNavbar;
