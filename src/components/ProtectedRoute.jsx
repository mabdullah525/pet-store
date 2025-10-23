import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase.jsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoggedIn, userRole } = useFirebase();

  // Agar user login nahi hai to login page pe bhejo
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // Agar allowedRoles di gayi hai to role match check karo
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Role match nahi karta → unauthorized
    return <Navigate to="/login" replace />;
  }

  // Sab theek hai → page show karo
  return children;
};

export default ProtectedRoute;
