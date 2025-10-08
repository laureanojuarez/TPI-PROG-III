import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`http://localhost:3000/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response.data;
          setUsername(userData.username);
          setEmail(userData.email);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    getUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1>Bienvenido {username}</h1>
      <p>email: {email}</p>
      <h1>Tus eventos</h1>
      <p>Evento: </p>
    </div>
  );
}
