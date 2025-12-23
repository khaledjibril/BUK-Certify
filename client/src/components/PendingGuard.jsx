import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PendingGuard({ children }) {
  const { user } = useAuth();

  if (user?.isApproved === false) {
    return <Navigate to="/pending-approval" replace />;
  }

  return children;
}
