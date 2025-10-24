import {useContext} from "react";
import {AuthContext} from "../../services/auth/auth.context";

export default function Dashboard() {
  const {user} = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-700">Cargando...</p>
        </div>
      </div>
    );
  }

  const {username, email, role} = user;
  const entradas = user.detalle_venta || [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full h-44 bg-linear-to-r from-[#7c00e2] to-[#4b00b0] flex items-end">
        <div className="max-w-5xl w-full mx-auto px-6 pb-6 flex flex-wrap items-end gap-4">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{username ?? "Usuario"}</h2>
            <p className="text-sm opacity-90">
              {email ?? "usuario@ejemplo.com"}
            </p>
            <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold mt-2">
              Rol: {role}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
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
                  className="flex md:flex-row items-center bg-gray-50 border rounded-xl p-4 shadow-sm gap-4"
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
    </div>
  );
}
