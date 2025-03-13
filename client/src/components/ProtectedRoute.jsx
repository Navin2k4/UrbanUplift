import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin/citizen" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case "CITIZEN":
        return <Navigate to="/dashboard/citizen" />;
      case "NGO":
        return <Navigate to="/dashboard/ngo" />;
      case "GOVT":
        return <Navigate to={`/dashboard/${user.department}`} />;
      case "NSS":
        return <Navigate to="/dashboard/college" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute;
