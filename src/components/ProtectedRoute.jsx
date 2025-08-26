import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const adminId = sessionStorage.getItem("adminId"); // keep consistent

  if (!adminId) {
    return <Navigate to="/" replace />;
  }

  return children;
}
