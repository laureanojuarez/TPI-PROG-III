import {useEffect, useState} from "react";
import {AuthContext} from "./auth.context";

const tokenValue = localStorage.getItem("token");

export const AuthContextProvider = ({children}) => {
  const [token, setToken] = useState(tokenValue);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setUser(null);
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/me", {
        headers: {Authorization: `Bearer ${token}`},
      });
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      handleUserLogout();
    }
  };

  const handleUserLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{token, user, handleUserLogin, handleUserLogout}}
    >
      {children}
    </AuthContext.Provider>
  );
};
