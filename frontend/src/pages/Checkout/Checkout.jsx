import {useContext, useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Area} from "../../components/Area/Area";
import {useEventDetail} from "../../hooks/useEventDetail";
import {AuthContext} from "../../services/auth/auth.context";

export default function Checkout() {
  const {id} = useParams();
  const {event, loading} = useEventDetail(id);
  const [area, setArea] = useState("");
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:3000/event/comprar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_evento: event.id,
          sector: area,
          cantidad: 1,
          subtotal: 1000,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Compra realizada con éxito");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        alert("Error en la compra: " + data.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error en la compra");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          Selecciona tu sector
        </h2>
        <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center">
          {/* Detalles del evento */}
          <div className="flex flex-col items-center md:w-1/2 w-full">
            <img
              src={event.poster}
              alt={event.name}
              className="w-60 h-80 object-cover rounded mb-4"
            />
            <h1 className="text-3xl font-bold mb-2 text-center">
              {event.name}
            </h1>
            <p className="text-gray-600 mb-1 text-center">
              <span className="font-semibold">Fecha:</span>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-1 text-center">
              <span className="font-semibold">Ubicación:</span> {event.location}
            </p>
            <p className="text-gray-600 mb-1 text-center">
              <span className="font-semibold">Artista:</span> {event.artist}
            </p>
            <p className="text-gray-700 mt-4 text-center">
              {event.description}
            </p>
          </div>
          {/* Selección de sector y compra */}
          <div className="flex flex-col items-center md:w-1/2 w-full">
            <Area area={area} setArea={setArea} />
            {area === "" && (
              <span className="text-red-600 text-lg font-semibold block mt-2 text-center">
                Por favor selecciona un sector
              </span>
            )}
            {area && (
              <div className="mt-4 flex flex-col items-center gap-2 w-full">
                <span className="text-lg font-medium text-center">
                  Sector seleccionado:{" "}
                  <span className="text-indigo-700">{area}</span>
                </span>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-semibold text-lg transition w-full"
                  onClick={handleCheckout}
                >
                  Comprar entrada
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
