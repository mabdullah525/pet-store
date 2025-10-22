import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useFirebase } from "./context/Firebase.jsx";

// 🧩 Pages
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddListing from "./pages/AddListing.jsx"; // ✅ Capitalized correctly
import MyListing from "./pages/MyListing.jsx";   // ✅ Capitalized correctly
import BuyerDashboard from "./pages/buyer/BuyerDashboard.jsx";
import AllPets from "./pages/buyer/AllPets.jsx";
import BuyerNavbar from "./pages/buyer/BuyerNavbar.jsx";
import SellerOrder from "./pages/SellerOrder.jsx";

// 🧱 Components
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Profile from "./components/Profile.jsx"; // ✅ Capitalized correctly
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
                {isSeller ? <AddListing /> : <BuyerDashboard />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-listings"
            element={
              <ProtectedRoute>
                {isSeller ? <MyListing /> : <BuyerDashboard />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller-orders"
            element={
              <ProtectedRoute>
                <SellerOrder />
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

          {/* Cart Drawer */}
          <Route path="/cart-drawer" element={<CartDrawer />} />

          {/* Profile Page */}
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
