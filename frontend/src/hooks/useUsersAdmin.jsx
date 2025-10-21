import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../services/auth/auth.context";

export const useUsersAdmin = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!token) return;
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const admins = data.filter((e) => e.role == "admin");
      setUsers(admins);
    } catch (error) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, refetch: fetchUsers };
};
