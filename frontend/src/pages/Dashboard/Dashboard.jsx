import {Link} from "react-router-dom";
import {useUserData} from "../../hooks/useUserData";

export default function Dashboard() {
  const {user, entradas, loading} = useUserData();

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-700">Cargando...</p>
        </div>
      </div>
    );
  }

  const {username, email, role} = user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center pt-16">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10 relative">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              Bienvenido, {username}
            </h1>
            <p className="text-gray-600 mb-4">Email: {email}</p>
            <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
              Rol: {role}
            </span>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            {(role === "admin" || role === "superadmin") && (
              <Link
                to="/admin"
                className="w-full md:w-auto py-2 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-center shadow"
              >
                Ir a Admin
              </Link>
            )}
            {role === "superadmin" && (
              <Link
                to="/superadmin"
                className="w-full md:w-auto py-2 px-6 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition text-center shadow"
              >
                Ir a Super Admin
              </Link>
            )}
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">
          Tus entradas
        </h2>
        <ul className="space-y-4">
          {entradas.length === 0 ? (
            <li className="text-gray-500 text-center">No tienes entradas.</li>
          ) : (
            entradas.map((entrada) => (
              <li
                key={entrada.id}
                className="flex  md:flex-row items-center bg-gray-50 border rounded-xl p-4 shadow-sm gap-4"
              >
                <img
                  src={entrada.evento.poster}
                  alt={entrada.evento.name}
                  className="h-28 w-28 object-cover rounded-lg border"
                />
                <div className="flex-1 flex flex-col gap-1 ml-0 md:ml-4">
                  <span className="font-semibold text-indigo-700 text-lg">
                    {entrada.evento ? entrada.evento.name : "Sin nombre"}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Fecha:</span>{" "}
                    {entrada.evento
                      ? new Date(entrada.evento.date).toLocaleDateString()
                      : ""}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Sector:</span>{" "}
                    {entrada.sector}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Cantidad:</span>{" "}
                    {entrada.cantidad}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Subtotal:</span> $
                    {entrada.subtotal}
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
