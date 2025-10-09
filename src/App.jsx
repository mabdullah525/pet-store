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

// Components
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Profile from "./components/profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  const { user, userRole } = useFirebase();  // ✅ move this INSIDE component
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!hideLayout && user && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {!hideLayout && user && <Topbar />}

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                {/* ✅ Role check properly */}
                {userRole === "seller" ? <Dashboard /> : <BuyerDashboard />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-listing"
            element={
              <ProtectedRoute>
                <Addlisting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-listings"
            element={
              <ProtectedRoute>
                <Mylisting />
              </ProtectedRoute>
            }
          />
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
