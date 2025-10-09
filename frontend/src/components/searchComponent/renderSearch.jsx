import { useLocation } from "react-router-dom";

export const RenderSearch = () => {
  const location = useLocation();
  const resultados = location.state?.resultados || [];
  console.log("Location state:", location.state);

  if (resultados.length === 0) {
    return <p className="text-white">No se encontraron resultados.</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      {resultados.map((e) => (
        <div
          key={e.id}
          className="bg-white text-black p-6 rounded-xl shadow-md border border-gray-300 max-w-md w-full mx-auto mb-6 transition-transform hover:scale-[1.02]"
        >
          <h2 className="text-2xl font-bold text-[#7c00e2] mb-2">{e.name}</h2>
          <p className="text-gray-700 mb-4">{e.description}</p>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold">📍 Ubicación:</span>
              <span>{e.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">📅 Fecha:</span>
              <span>{e.date || "Sin fecha definida"}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="bg-[#7c00e2] text-white px-4 py-2 rounded hover:bg-[#5a00b0] transition-colors">
              Ver más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
