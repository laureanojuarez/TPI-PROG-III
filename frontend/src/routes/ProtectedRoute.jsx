import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isSignedIn, children }) {
  const signed = isSignedIn || !!localStorage.getItem("token");
  if (!signed) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
