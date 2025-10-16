import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useFirebase } from "./context/Firebase.jsx";

// Pages
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Addlisting from "./pages/Addlisting.jsx";
import Mylisting from "./pages/Mylisting.jsx";
import BuyerDashboard from "./pages/buyer/BuyerDashboard.jsx";
import AllPets from "./pages/buyer/AllPets.jsx";
import BuyerNavbar from "./pages/buyer/BuyerNavbar.jsx";
import MyOrders from "./pages/buyer/Cart.jsx";

// Components
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Profile from "./components/profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  const { user, userRole } = useFirebase();
  const location = useLocation();

  // 🔹 Hide layout on login/register
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  // 🔹 Check if it's a buyer or seller
  const isSeller = userRole === "seller";
  const isBuyer = userRole === "buyer";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 🔸 Seller Layout */}
      {!hideLayout && isSeller && user && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {!hideLayout && isSeller && user && <Topbar />}

        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Seller Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {isSeller ? <Dashboard /> : <BuyerDashboard />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-listing"
            element={
              <ProtectedRoute>
                {isSeller ? <Addlisting /> : <BuyerDashboard />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-listings"
            element={
              <ProtectedRoute>
                {isSeller ? <Mylisting /> : <BuyerDashboard />}
              </ProtectedRoute>
            }
          />

          {/* Buyer Routes */}
          <Route
            path="/buyer-dashboard"
            element={
              <ProtectedRoute>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-pets"
            element={
              <ProtectedRoute>
                <AllPets />
              </ProtectedRoute>
            }
          />
          <Route path="/my-orders" element={<MyOrders />} /> {/* ✅ Add this */}

          {/* Common */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
