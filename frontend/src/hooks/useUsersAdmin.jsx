import {useContext, useState, useEffect, useCallback} from "react";
import {AuthContext} from "../services/auth/auth.context";

export const useUsersAdmin = () => {
  const {token} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/auth/users", {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (!res.ok) throw new Error("Error al cargar usuarios");
      const data = await res.json();
      const admins = data.filter((e) => e.role !== "superadmin");
      setUsers(admins);
    } catch (error) {
      setUsers([]);
      setError(error.message);
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {users, loading, error, refetch: fetchUsers};
};
