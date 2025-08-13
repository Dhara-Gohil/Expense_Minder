// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Example: "supplier" or "shopkeeper"

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  

  return children;
}
