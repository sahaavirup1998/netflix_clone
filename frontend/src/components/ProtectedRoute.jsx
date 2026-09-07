import { Navigate } from "react-router-dom";
import authStore from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const { user, fetchingUser } = authStore();

  // Wait until authentication check is complete
  if (fetchingUser) {
    return <div>Loading...</div>;
  }

  // If user is not logged in
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // If user is logged in
  return children;
};

export default ProtectedRoute;