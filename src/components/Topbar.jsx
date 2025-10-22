import React, { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { useFirebase } from "../context/Firebase.jsx";


const Topbar = () => {
  const { user, logoutUser } = useFirebase();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="topbar">
      {/* 🐾 Logo */}
      <div className="topbar-logo">
        🐾 <span>PetStore</span>
      </div>

      {/* 🔔 Right Section */}
      <div className="topbar-right">
        {/* Notification */}
        <button className="notify-btn">
          <Bell size={22} className="notify-icon" />
          <span className="notify-dot"></span>
        </button>

        {/* 👤 Profile */}
        <div className="profile-section">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="profile-btn"
          >
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="profile-img"
            />
            <span className="profile-name">Abdullah</span>
          </button>

          {showDropdown && (
            <div className="profile-dropdown">
              <div className="profile-email">
                {user?.email || "user@gmail.com"}
              </div>

              <button onClick={logoutUser} className="logout-btn">
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
