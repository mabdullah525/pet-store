import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useFirebase } from './context/Firebase.jsx';

// Pages
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Addlisting from './pages/Addlisting.jsx';
import Mylisting from './pages/Mylisting.jsx';
import BuyerDashboard from './pages/buyer/BuyerDashboard.jsx';
import AllPets from './pages/buyer/AllPets.jsx';

// Components
import Topbar from './components/Topbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Profile from './components/profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  const { user } = useFirebase(); // 🔹 Firebase context se user lo
  const location = useLocation(); // 🔹 current URL path

  // 🔸 ye check karega agar login/register page pe ho to sidebar/topbar hide ho
  const hideLayout =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Sidebar sirf tab dikhaye jab user logged in ho aur login/register page na ho */}
      {!hideLayout && user && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {/* ✅ Topbar bhi same condition pe */}
        {!hideLayout && user && <Topbar />}

        <Routes>
          {/* 🔹 Public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* 🔹 Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
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

          {/* ✅ Buyer Pages */}
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/all-pets" element={<AllPets />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {user?.role === "seller" ? <Dashboard /> : <BuyerDashboard />}
            </ProtectedRoute>
          }
        />


      </div>
    </div>
  );
};

export default App;
