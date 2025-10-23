import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Heart, LogOut, PawPrint } from "lucide-react";
import { useFirebase } from "../../context/Firebase.jsx";

const BuyerSidebar = () => {
    const { logoutUser, user } = useFirebase();

    const links = [
        { to: "/buyer-dashboard", label: "All Pets", icon: <Home size={20} /> },
        { to: "/my-orders", label: "My Orders", icon: <ShoppingBag size={20} /> },
        { to: "/wishlist", label: "Wishlist", icon: <Heart size={20} /> },
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

                {/* 🧭 Navigation Links */}
                <nav className="space-y-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
                ${isActive
                                    ? "bg-white/25 text-white font-medium shadow-md"
                                    : "text-white/80 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            <div className="transition-transform group-hover:scale-110">
                                {link.icon}
                            </div>
                            <span>{link.label}</span>
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

export default BuyerSidebar;
