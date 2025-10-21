import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../services/auth/auth.context";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [entradas, setEntradas] = useState([]);

  const { token } = useContext(AuthContext);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Debes iniciar sesión para ver tu Dashboard.</p>
        <Link to="/login" className="text-indigo-600 ml-2">
          Ir al login
        </Link>
      </div>
    );
  }

  useEffect(() => {
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
        setEntradas(userData.detalle_venta || []);
        console.log("Entradas del usuario:", userData.detalle_venta);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchUser();
  }, [token]);

  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

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
                  Evento: {entrada.evento ? entrada.evento.name : "Sin nombre"}
                </span>
                <span className="text-gray-600">
                  Fecha:{" "}
                  {entrada.evento
                    ? new Date(entrada.evento.date).toLocaleDateString()
                    : ""}
                </span>
                <span className="text-gray-600">Sector: {entrada.sector}</span>
                <span className="text-gray-600">
                  Cantidad: {entrada.cantidad}
                </span>
                <span className="text-gray-600">
                  Subtotal: ${entrada.subtotal}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
