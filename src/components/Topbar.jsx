import React, { useState } from "react";
import { Search, ShoppingCart, Bell, User } from "lucide-react";
import Profile from "./profile.jsx";


const Topbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="topbar">
      {/* Logo */}
      <div className="logo">
        🐾 <span>PetStore</span>
      </div>

      {/* Icons */}
      <div className="icons">
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <button
          className="icon-btn"
          onClick={() => setShowProfile(!showProfile)}
        >
          <User size={20} />
        </button>

        {/* Profile Modal */}
        {showProfile && (
          <div className="profile-modal">
            <Profile />
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
