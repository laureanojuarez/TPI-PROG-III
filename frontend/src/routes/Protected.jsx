import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../services/auth/auth.context";
import { isTokenValid } from "../../hooks/isTokenValid";

export default function Protected() {
  const { token } = useContext(AuthContext);

  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
