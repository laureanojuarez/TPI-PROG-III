import {useState} from "react";

export const ChangePassword = ({onChangePassword, errorMsg}) => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onChangePassword)
      onChangePassword({current, newPass, confirm}, () => {
        setCurrent("");
        setNewPass("");
        setConfirm("");
      });
  };
  return (
    <form onSubmit={handleSubmit} className="p-8 flex-1 max-w-md">
      <h3 className="text-xl font-semibold mb-4">Cambiar contraseña</h3>
      {errorMsg && (
        <div className="mb-4 text-red-600 font-semibold">{errorMsg}</div>
      )}
      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">
          Contraseña actual
        </label>
        <input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#7c00e2] focus:ring-2 focus:ring-[#7c00e2]/20"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">
          Nueva contraseña
        </label>
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#7c00e2] focus:ring-2 focus:ring-[#7c00e2]/20"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Confirmar nueva contraseña
        </label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#7c00e2] focus:ring-2 focus:ring-[#7c00e2]/20"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            setCurrent("");
            setNewPass("");
            setConfirm("");
          }}
          className="px-4 py-2 rounded border"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-[#7c00e2] text-white"
        >
          Cambiar contraseña
        </button>
      </div>
    </form>
  );
};
