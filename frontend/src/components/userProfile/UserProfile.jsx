import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../services/auth/auth.context";
import { PersonalData } from "./PersonalData";
import { ChangePassword } from "./ChangePassword";

export const UserProfile = () => {
  const [option, setOption] = useState("personal");
  const [data, setData] = useState(null);
  const [entradas, setEntradas] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      try {
        const userRes = await fetch("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setData(userData);
        setEntradas(userData.detalle_venta || []);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full h-44 bg-gradient-to-r from-[#7c00e2] to-[#4b00b0] flex items-end">
        <div className="max-w-5xl w-full mx-auto px-6 pb-6 flex items-end gap-4">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{data?.name ?? "Usuario"}</h2>
            <p className="text-sm opacity-90">
              {data?.email ?? "usuario@ejemplo.com"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto px-6 py-8 flex gap-6">
        <aside className="w-64 bg-white border rounded-lg shadow-sm">
          <div className="divide-y">
            <button
              onClick={() => setOption("personal")}
              className={`w-full text-left px-6 py-4 ${
                option === "personal"
                  ? "bg-[#f5f0ff] font-semibold text-[#4b00b0]"
                  : "hover:bg-gray-50"
              }`}
            >
              Datos personales
            </button>
            <button
              onClick={() => setOption("security")}
              className={`w-full text-left px-6 py-4 ${
                option === "security"
                  ? "bg-[#f5f0ff] font-semibold text-[#4b00b0]"
                  : "hover:bg-gray-50"
              }`}
            >
              Contraseña
            </button>
            <button
              onClick={() => setOption("events")}
              className={`w-full text-left px-6 py-4 ${
                option === "events"
                  ? "bg-[#f5f0ff] font-semibold text-[#4b00b0]"
                  : "hover:bg-gray-50"
              }`}
            >
              Mis eventos
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
            {option === "personal" && (
              <PersonalData
                data={data}
                onSave={(payload) => console.log("save", payload)}
              />
            )}
            {option === "security" && (
              <ChangePassword
                data={data}
                onChangePassword={(p) => console.log("change password", p)}
              />
            )}
            {option === "events" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Mis eventos</h3>
                <p className="text-gray-600">
                  {entradas.map(() =>
                    entradas.map((entrada) => (
                      <li
                        key={entrada.id}
                        className="border rounded p-3 bg-gray-50 flex "
                      >
                        <img
                          src={entrada.evento.poster}
                          alt="dsad"
                          className="h-32"
                        />
                        <div className="flex flex-col ml-4">
                          <span className="font-medium text-blue-700">
                            Evento:{" "}
                            {entrada.evento
                              ? entrada.evento.name
                              : "Sin nombre"}
                          </span>
                          <span className="text-gray-600">
                            Fecha:{" "}
                            {entrada.evento
                              ? new Date(
                                  entrada.evento.date
                                ).toLocaleDateString()
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
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
