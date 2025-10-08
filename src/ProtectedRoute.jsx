import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useFirebase();
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
