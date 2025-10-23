import {useContext, useState} from "react";
import {PersonalData} from "../../components/userProfile/PersonalData";
import {ChangePassword} from "../../components/userProfile/ChangePassword";
import {useUserData} from "../../hooks/useUserData";
import {AuthContext} from "../../services/auth/auth.context";
import {
  validateEmail,
  validatePassword,
  validateString,
} from "../Auth/auth.services";

export default function UserProfile() {
  const [option, setOption] = useState("personal");
  const {user, entradas, loading} = useUserData();
  const {token} = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const updateProfile = async (userId, payload, token) => {
    const res = await fetch(`http://localhost:3000/auth/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error al actualizar el perfil");
    }
    return data;
  };

  const handleSave = async (payload) => {
    setErrorMsg("");
    setSuccessMsg("");

    if (payload.username && !validateString(payload.username, 3, 30)) {
      setErrorMsg("El nombre de usuario debe tener entre 3 y 30 caracteres");
      return;
    }

    if (payload.email && !validateEmail(payload.email)) {
      setErrorMsg("El email no es válido");
      return;
    }

    try {
      await updateProfile(user.id, payload);
      setSuccessMsg("Perfil actualizado correctamente");
    } catch (error) {
      setErrorMsg(error.message || "Error al actualizar el perfil");
    }
  };

  const handleChangePassword = async (
    {current, newPass, confirm},
    clearFields
  ) => {
    setErrorMsg("");
    setSuccessMsg("");

    if (newPass !== confirm) {
      setErrorMsg("La nueva contraseña y la confirmación no coinciden");
      return;
    }

    if (!validatePassword(newPass, 7, null, true, true)) {
      setErrorMsg(
        "La nueva contraseña debe tener al menos 7 caracteres, una letra mayúscula y un número"
      );
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/auth/user/${user.id}/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({current, newPass}),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error al cambiar la contraseña");
      }
      setSuccessMsg("Contraseña actualizada correctamente");
      if (clearFields) clearFields();
    } catch (error) {
      setErrorMsg(error.message || "Error al cambiar la contraseña");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="text-xl text-gray-600">Cargando perfil...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full h-44 bg-linear-to-r from-[#7c00e2] to-[#4b00b0] flex items-end">
        <div className="max-w-5xl w-full mx-auto px-6 pb-6 flex flex-wrap items-end gap-4">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{user.username ?? "Usuario"}</h2>
            <p className="text-sm opacity-90">
              {user.email ?? "usuario@ejemplo.com"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto px-6 py-8 flex gap-2 md:gap-4 flex-wrap justify-center">
        <aside className="w-64 bg-white border rounded-lg shadow-sm">
          <div className="divide-y">
            <button
              onClick={() => setOption("personal")}
              className={`w-full text-left px-6 py-4  rounded-t-lg ${
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
            {successMsg && (
              <div className="mb-4 text-green-600 font-semibold">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="mb-4 text-red-600 font-semibold">{errorMsg}</div>
            )}
            {option === "personal" && (
              <PersonalData
                data={user}
                onSave={handleSave}
                errorMsg={errorMsg}
              />
            )}
            {option === "security" && (
              <ChangePassword
                data={user}
                onChangePassword={handleChangePassword}
                errorMsg={errorMsg}
              />
            )}
            {option === "events" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Mis eventos</h3>
                {loading ? (
                  <p className="text-gray-500">Cargando entradas...</p>
                ) : entradas.length === 0 ? (
                  <p className="text-gray-500">No tienes entradas.</p>
                ) : (
                  <ul>
                    {entradas.map((entrada) => (
                      <li
                        key={entrada.id}
                        className="border rounded p-3 bg-gray-50 flex mb-2"
                      >
                        <img
                          src={entrada.evento.poster}
                          alt={entrada.evento.name}
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
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
