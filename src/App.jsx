import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useFirebase } from "./context/Firebase.jsx";

// 🧩 Pages
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // Seller dashboard
import AddListing from "./pages/AddListing.jsx";
import MyListing from "./pages/MyListing.jsx";
import BuyerDashboard from "./pages/buyer/BuyerDashboard.jsx"; // Buyer dashboard
import SellerOrder from "./pages/SellerOrder.jsx";

// 🧱 Components
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import BuyerSidebar from "./pages/buyer/BuyerSidebar.jsx"; // ✅ new buyer sidebar
import BuyerNavbar from "./pages/buyer/BuyerNavbar.jsx"; // ✅ buyer topbar/navbar
import Profile from "./components/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

const App = () => {
  const { user, userRole } = useFirebase();
  const location = useLocation();

  // 🔹 Hide layout on login/register pages
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  // 🔹 Role check
  const isSeller = userRole === "seller";
  const isBuyer = userRole === "buyer";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 🔸 Seller Sidebar */}
      {!hideLayout && isSeller && user && <Sidebar />}

      {/* 🔸 Buyer Sidebar */}
      {!hideLayout && isBuyer && user && <BuyerSidebar />}

      <div className="flex-1 flex flex-col">
        {/* 🔸 Seller Topbar */}
        {!hideLayout && isSeller && user && <Topbar />}

        {/* 🔸 Buyer Navbar */}
        {!hideLayout && isBuyer && user && <BuyerNavbar />}

        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* 🧑‍💼 Seller Protected Routes */}
          <Route
            path="/seller-dashboard"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-listing"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <AddListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-listings"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <MyListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller-orders"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerOrder />
              </ProtectedRoute>
            }
          />

          {/* 🐾 Buyer Protected Routes */}
          <Route
            path="/buyer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["buyer"]}>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />

          {/* 👤 Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["buyer", "seller"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 🛒 Cart Drawer */}
          <Route
            path="/cart-drawer"
            element={
              <ProtectedRoute allowedRoles={["buyer"]}>
                <CartDrawer />
              </ProtectedRoute>
            }
          />

          {/* ⚠️ Default Redirect */}
          <Route
            path="/"
            element={
              user ? (
                isSeller ? (
                  <Navigate to="/seller-dashboard" replace />
                ) : (
                  <Navigate to="/buyer-dashboard" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ⚠️ Catch All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
