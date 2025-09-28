import {Navigate} from "react-router-dom";

export default function ProtectedRoute({isSignedIn, children}) {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
