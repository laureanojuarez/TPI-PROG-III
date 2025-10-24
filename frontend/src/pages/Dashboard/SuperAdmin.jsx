import {useContext} from "react";
import {useUsersAdmin} from "../../hooks/useUsersAdmin";
import {AuthContext} from "../../services/auth/auth.context";
import {Navigate} from "react-router-dom";

export default function SuperAdmin() {
  const {token, user} = useContext(AuthContext);
  const {users = [], refetch} = useUsersAdmin();

  if (user && user.role !== "superadmin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="text-xl text-gray-600">Cargando...</span>
      </div>
    );
  }

  const handleRemoveAdmin = async (id) => {
    try {
      await fetch(`http://localhost:3000/auth/user/${id}/admin`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      refetch();
    } catch (err) {
      console.error("Error al remover rol de administrador");
    }
  };
  const handleSetAdmin = async (id) => {
    try {
      await fetch(`http://localhost:3000/auth/user/${id}/admin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      refetch();
    } catch (err) {
      console.error("Error al asignar rol de administrador");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full h-44 bg-gradient-to-r from-blue-800 to-blue-950 flex items-end">
        <div className="max-w-5xl w-full mx-auto px-6 pb-6 flex flex-wrap items-end gap-4">
          <div className="text-white">
            <h2 className="text-2xl font-bold">Panel Super Admin</h2>
            <p className="text-sm opacity-90">
              Gestiona los administradores del sistema.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
          <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">
            Gestión de Administradores
          </h2>
          <ul className="space-y-4">
            {users.map((e) => (
              <li
                key={e.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 border rounded-xl p-4 shadow-sm gap-4"
              >
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-indigo-700">
                    {e.username}
                  </h4>
                  <p className="text-gray-600">{e.email}</p>
                  {e.role && (
                    <span className="inline-block mt-2 px-3 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-medium">
                      {e.role}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {e.role === "admin" ? (
                    <button
                      className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition font-semibold"
                      onClick={() => handleRemoveAdmin(e.id)}
                    >
                      Quitar Admin
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition font-semibold"
                      onClick={() => handleSetAdmin(e.id)}
                    >
                      Dar Admin
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
