import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [entradas, setEntradas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const fetchUser = async () => {
      try {
        const userRes = await fetch("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUsername(userData.username);
        setEmail(userData.email);
        setRole(userData.role);

        const entradasRes = await fetch(
          "http://localhost:3000/auth/me/entradas",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const entradasData = await entradasRes.json();
        setEntradas(entradasData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8 relative">
        {role === "admin" && (
          <Link
            to="/admin"
            className="absolute top-6 right-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Ir a Admin
          </Link>
        )}
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Bienvenido, {username}
        </h1>
        <p className="text-gray-600 mb-4">Email: {email}</p>
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          Tus entradas
        </h2>
        <ul className="space-y-2">
          {entradas.length === 0 ? (
            <li className="text-gray-500">No tienes entradas.</li>
          ) : (
            entradas.map((entrada) => (
              <li
                key={entrada.id}
                className="border rounded p-3 bg-gray-50 flex flex-col"
              >
                <span className="font-medium text-blue-700">
                  Evento: {entrada.eventoNombre}
                </span>
                <span className="text-gray-600">Fecha: {entrada.fecha}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
