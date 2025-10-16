import { useLocation } from "react-router-dom";

export default function Resultados() {
  const location = useLocation();
  const resultados = location.state?.resultados || [];
  console.log("Location state:", location.state);

  if (resultados.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6">
        <div className="max-w-lg w-full text-center bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <svg
            className="mx-auto mb-4 w-20 h-20 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
            ></path>
          </svg>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No hay resultados
          </h3>
          <p className="text-gray-600 mb-6">
            Intenta con otros términos de búsqueda o revisa los filtros.
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
            >
              Volver
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-4 py-2 rounded-md bg-[#7c00e2] text-white hover:bg-[#5a00b0] transition"
            >
              Ir al inicio
            </button>
          </div>
        </div>
      </div>
    );
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
}
