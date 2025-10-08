import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Pages
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Addlisting from './pages/Addlisting.jsx';
import Mylisting from './pages/Mylisting.jsx';

// Components
import Topbar from './components/Topbar.jsx';
import Sidebar from './components/Sidebar.jsx';

const App = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Sidebar (left side) */}
      <Sidebar />

      {/* ✅ Main Area */}
      <div className="flex-1 flex flex-col">
        {/* ✅ Topbar (top of content area) */}
        <Topbar />

        {/* ✅ Page content */}
        {/* <main className="p-6 flex-1"> */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-listing" element={<Addlisting />} />
            <Route path="/my-listings" element={<Mylisting />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        {/* </main> */}
      </div>
    </div>
  );
};

export default App;
