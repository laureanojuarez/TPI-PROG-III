export default function ProtectedRoute({ children }) {
  const isAuthenticated = false; // Replace with your authentication logic

  return isAuthenticated ? children : <Navigate to="/login" />;
}
