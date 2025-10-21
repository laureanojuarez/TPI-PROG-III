import { useState } from "react";
import { AuthContext } from "./auth.context";

const tokenValue = localStorage.getItem("token");

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);

  const handleUserLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext value={{ token, handleUserLogin, handleUserLogout }}>
      {children}
    </AuthContext>
  );
};
