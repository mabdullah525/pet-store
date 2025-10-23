import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Heart, User, LogOut } from "lucide-react";
import { useFirebase } from "../../context/Firebase.jsx";


const BuyerSidebar = () => {
    const { logoutUser } = useFirebase();

    const handleLogout = async () => {
        await logoutUser();
    };

    const links = [
        { to: "/all-pets", label: "All Pets", icon: <Home size={18} /> },
        { to: "/my-orders", label: "My Orders", icon: <ShoppingBag size={18} /> },
        { to: "/wishlist", label: "Wishlist", icon: <Heart size={18} /> },
        { to: "/profile", label: "Profile", icon: <User size={18} /> },
    ];

    return (
        <div className="w-60 bg-white border-r h-screen shadow-sm flex flex-col justify-between">
            <div>
                {/* 🐾 Logo */}
                <div className="text-center py-5 border-b font-bold text-xl text-blue-600">
                    🐾 PetStore
                </div>

                {/* 🔗 Navigation Links */}
                <nav className="mt-6 flex flex-col">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""
                                }`
                            }
                        >
                            {link.icon}
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* 🚪 Logout Button */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 border-t transition"
            >
                <LogOut size={18} />
                Logout
            </button>
        </div>
    );
};

export default BuyerSidebar;
