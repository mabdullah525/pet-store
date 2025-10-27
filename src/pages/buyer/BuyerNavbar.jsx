import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useFirebase } from "../../context/Firebase.jsx";
import { User, LogOut, ChevronDown, ShoppingCart } from "lucide-react";
import CartDrawer from "../../components/CartDrawer.jsx";

const BuyerNavbar = () => {
  const { logoutUser, user } = useFirebase();
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // 🛒 temporary static cart items (you’ll replace later)
  const cartItems = [
    { id: 1, name: "Golden Retriever", price: 1200, qty: 1, img: "/dog.jpg" },
    { id: 2, name: "Persian Cat", price: 900, qty: 2, img: "/cat.jpg" },
  ];

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
        {/* 🐾 Left Section - Logo */}
        <Link
          to="/all-pets"
          className="flex items-center gap-2 text-xl font-bold text-blue-600"
        >
          🐾 <span>PetStore</span>
        </Link>

        {/* 🔗 Center Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <NavLink
            to="/all-pets"
            end
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            All Pets
          </NavLink>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-1 hover:text-blue-600 transition"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs px-1.5 rounded-full">
              {cartItems.length}
            </span>
          </button>
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
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg px-3 py-2 z-50">
              {user?.email || "No email"}

            </div>
          )}
        </div>
      </nav>

      {/* 🧾 Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
};

export default BuyerNavbar;
