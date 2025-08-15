import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const adminId = sessionStorage.getItem("adminId");

  if (!adminId) {
    return <Navigate to="/" replace />;
  }

  // If the protected route wraps a layout (Dashboard), render it
  // If it's just an outlet container, render children
  return children ? children : <Outlet />;
}
