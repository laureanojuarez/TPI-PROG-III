import {useState} from "react";
import {useParams, Link} from "react-router-dom";
import {Area} from "../../components/Area/Area";
import {useEventDetail} from "../../hooks/useEventDetail";

export default function CheckoutPage() {
  const {id} = useParams();
  const {event, loading} = useEventDetail(id);
  const [area, setArea] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="text-xl text-gray-600">Cargando evento...</span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Evento no encontrado</h1>
        <Link to="/" className="text-indigo-600">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center">
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <img
            src={event.poster}
            alt={event.name}
            className="w-60 h-80 object-cover rounded"
          />
          <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Fecha:</span>{" "}
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Ubicación:</span> {event.location}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Artista:</span> {event.artist}
          </p>
          <p className="text-gray-700 mt-4">{event.description}</p>
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Selecciona tu sector</h2>
          <Area area={area} setArea={setArea} />
          {area === "" && (
            <span className="text-red-600 text-lg font-semibold block mt-2">
              Por favor selecciona un sector
            </span>
          )}
          {area && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <span className="text-lg font-medium">
                Sector seleccionado:{" "}
                <span className="text-indigo-700">{area}</span>
              </span>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-semibold text-lg transition"
                // onClick={handleBuy}
              >
                Comprar entrada
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
