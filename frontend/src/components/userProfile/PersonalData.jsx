import {useState, useEffect} from "react";

export const PersonalData = ({data, onSave, errorMsg}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setUsername(data?.username ?? "");
    setEmail(data?.email ?? "");
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {};
    if (username !== data.username) payload.username = username;
    if (email !== data.email) payload.email = email;
    if (onSave) onSave(payload);
    setEditing(false);
  };

  const handleCancel = () => {
    setUsername(data?.username ?? "");
    setEmail(data?.email ?? "");
    setEditing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 flex flex-col gap-6 w-full max-w-3xl"
    >
      <h3 className="text-xl font-semibold mb-2">Información Personal</h3>
      {errorMsg && (
        <div className="mb-4 text-red-600 font-semibold">{errorMsg}</div>
      )}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <label htmlFor="userName" className="w-40 text-sm text-gray-700">
          Nombre de usuario:
        </label>

        {editing ? (
          <input
            type="text"
            id="userName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400
                     focus:border-[#7c00e2] focus:ring-2 focus:ring-[#7c00e2]/20 focus:outline-none transition"
          />
        ) : (
          <span className="flex-1 py-2 px-4 bg-gray-100 rounded">
            {username}
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <label htmlFor="userEmail" className="w-40 text-sm text-gray-700">
          Correo Electrónico:
        </label>
        {editing ? (
          <input
            type="email"
            id="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400
                       focus:border-[#7c00e2] focus:ring-2 focus:ring-[#7c00e2]/20 focus:outline-none transition"
          />
        ) : (
          <span className="flex-1 py-2 px-4 bg-gray-100 rounded">{email}</span>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        {editing ? (
          <>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded border"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#7c00e2] text-white"
            >
              Guardar
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="px-4 py-2 rounded bg-[#7c00e2] text-white"
          >
            Editar
          </button>
        )}
      </div>
    </form>
  );
};
