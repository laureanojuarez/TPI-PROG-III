import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../services/auth/auth.context";

export function useUserData() {
  const {token} = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/auth/me", {
          headers: {Authorization: `Bearer ${token}`},
        });
        const data = await res.json();
        setUser(data);
        setEntradas(data.detalle_venta || []);
      } catch (error) {
        setUser(null);
        setEntradas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  return {user, entradas, loading};
}
