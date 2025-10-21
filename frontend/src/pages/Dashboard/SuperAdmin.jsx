import { useUsersAdmin } from "../../hooks/useUsersAdmin";

export default function SuperAdmin() {
  const { users, refetch } = useUsersAdmin();

  const handleRemoveAdmin = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/auth/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      refetch();
    } catch (err) {
      console.error("Error al remover rol de administrador");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 px-8 py-10">
      <h2 className="text-2xl font-bold text-[#7c00e2] mb-8">
        Gestioná los Administradores
      </h2>

      <ul className="max-w-2xl mx-auto grid gap-6">
        {users.map((e) => (
          <li
            key={e.id}
            className="bg-white rounded-lg shadow flex items-center justify-between p-6 border"
          >
            <div>
              <h4 className="text-lg font-semibold text-[#4b00b0]">
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
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700 transition"
                onClick={() => handleRemoveAdmin(e.id)}
              >
                Quitar Admin
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
