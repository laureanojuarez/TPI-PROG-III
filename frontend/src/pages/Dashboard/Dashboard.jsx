import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../services/auth/auth.context";
import { useUserData } from "../../hooks/useUserData";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const { user, entradas, loading } = useUserData();

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

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  const { username, email, role } = user;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8 relative">
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-3 items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              Bienvenido, {username}
            </h1>
            <p className="text-gray-600 mb-4">Email: {email}</p>
          </div>
          {role === "admin" && (
            <Link
              to="/admin"
              className="md:w-auto w-full py-2 px-6  bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
            >
              Ir a Admin
            </Link>
          )}
          {role === "superadmin" && (
            <Link
              to="/superadmin"
              className="md:w-auto w-full py-2 px-6  bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
            >
              Ir a Super Admin
            </Link>
          )}
        </div>
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
                className="border rounded p-3 bg-gray-50 flex "
              >
                <img src={entrada.evento.poster} alt="dsad" className="h-32" />
                <div className="flex flex-col ml-4">
                  <span className="font-medium text-blue-700">
                    Evento:{" "}
                    {entrada.evento ? entrada.evento.name : "Sin nombre"}
                  </span>
                  <span className="text-gray-600">
                    Fecha:{" "}
                    {entrada.evento
                      ? new Date(entrada.evento.date).toLocaleDateString()
                      : ""}
                  </span>
                  <span className="text-gray-600">
                    Sector: {entrada.sector}
                  </span>
                  <span className="text-gray-600">
                    Cantidad: {entrada.cantidad}
                  </span>
                  <span className="text-gray-600">
                    Subtotal: ${entrada.subtotal}
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
