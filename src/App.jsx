import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useFirebase } from "./context/Firebase.jsx";

// 🧩 Pages
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddListing from "./pages/AddListing.jsx";
import MyListing from "./pages/MyListing.jsx";
import AllPets from "./pages/buyer/BuyerDashboard.jsx";
import SellerOrder from "./pages/SellerOrder.jsx";

// 🧱 Components
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Profile from "./components/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

const App = () => {
  const { user, userRole } = useFirebase();
  const location = useLocation();

  // 🔹 Hide layout on login/register pages
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  // 🔹 Check if logged-in user is seller
  const isSeller = userRole === "seller";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 🔸 Seller Sidebar */}
      {!hideLayout && isSeller && user && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {/* 🔸 Seller Topbar */}
        {!hideLayout && isSeller && user && <Topbar />}

        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* 🧑‍💼 Seller Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {isSeller ? <Dashboard /> : <Navigate to="/all-pets" replace />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-listing"
            element={
              <ProtectedRoute>
                {isSeller ? <AddListing /> : <Navigate to="/all-pets" replace />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-listings"
            element={
              <ProtectedRoute>
                {isSeller ? <MyListing /> : <Navigate to="/all-pets" replace />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller-orders"
            element={
              <ProtectedRoute>
                {isSeller ? <SellerOrder /> : <Navigate to="/all-pets" replace />}
              </ProtectedRoute>
            }
          />

          {/* 🐾 Buyer Protected Routes */}
          <Route
            path="/all-pets"
            element={
              <ProtectedRoute>
                <AllPets />
              </ProtectedRoute>
            }
          />

          {/* 👤 Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 🛒 Cart Drawer */}
          <Route path="/cart-drawer" element={<CartDrawer />} />

          {/* ⚠️ Catch All - Agar koi route nahi milta */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
