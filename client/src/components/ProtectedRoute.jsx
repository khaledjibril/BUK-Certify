import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, role: userRole } = useAuth();

  /* ================= NOT AUTHENTICATED ================= */
  if (!isAuthenticated) {
    if (role === "admin") {
      return <Navigate to="/admin-login" replace />;
    }

    if (role === "verifier") {
      return <Navigate to="/verifier-login" replace />;
    }

    // fallback (guest trying to access protected route)
    return <Navigate to="/" replace />;
  }

  /* ================= ROLE MISMATCH ================= */
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  /* ================= ACCESS GRANTED ================= */
  return children;
}
