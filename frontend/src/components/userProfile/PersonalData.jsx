import React from "react";
import { useState, useEffect } from "react";

export const PersonalData = ({ data, onSave }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUsername(data?.username ?? "");
    setEmail(data?.email ?? "");
  }, [data]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (onSave) onSave({ username, email });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 flex flex-col gap-6 w-full max-w-3xl"
    >
      <h3 className="text-xl font-semibold">Información Personal</h3>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <label htmlFor="userName" className="w-40 text-sm text-gray-700">
          Nombre de usuario:
        </label>
        <input
          type="text"
          id="userName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400
                     focus:border-[#7c00e2] focus:ring-2 focus:ring-[#7c00e2]/20 focus:outline-none transition"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <label htmlFor="userEmail" className="w-40 text-sm text-gray-700">
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="userEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400
                     focus:border-[#7c00e2] focus:ring-2 focus:ring-[#7c00e2]/20 focus:outline-none transition"
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={() => {
            setUsername(data?.username ?? "");
            setEmail(data?.email ?? "");
          }}
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
      </div>
    </form>
  );
};
