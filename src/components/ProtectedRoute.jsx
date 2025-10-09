import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase.jsx";

const ProtectedRoute = ({ children }) => {
    const { user, isLoggedIn } = useFirebase();

    // Agar user login nahi hai to redirect kar do login page pe
    if (!isLoggedIn || !user) {
        return <Navigate to="/login" replace />;
    }

    // Agar user login hai to normal page show karo
    return children;
};

export default ProtectedRoute;
