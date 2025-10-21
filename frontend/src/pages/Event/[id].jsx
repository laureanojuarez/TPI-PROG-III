import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../services/auth/auth.context";
import { useEventDetail } from "../../hooks/useEventDetail";

export default function EventDetail() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const { event, loading } = useEventDetail(id);

  if (!event) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center bg-gray-100 w-full min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Evento no encontrado
        </h1>
        <Link to="/" className="text-indigo-600 underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #7c00e2 0%, #4b00b0 40%, #222 100%)",
      }}
    >
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        {/* Imagen horizontal solo en md y arriba */}
        <div className="hidden md:block w-full rounded-xl overflow-hidden shadow-xl mb-8">
          <img
            src={event.posterHorizontal}
            alt={event.name}
            className="w-full h-[320px] object-cover bg-[#222] transition-all duration-300"
          />
        </div>
        {/* Imagen vertical solo en mobile */}
        <div className="md:hidden w-full rounded-xl overflow-hidden shadow-xl mb-8">
          <img
            src={event.poster}
            alt={event.name}
            className="w-full h-[320px] object-cover bg-[#222] transition-all duration-300"
          />
        </div>
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg px-8 py-10 flex flex-col items-center">
          <h2 className="text-base font-semibold text-[#7c00e2] mb-2 tracking-wide uppercase">
            {new Date(event.date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h2>
          <h1 className="text-4xl font-extrabold mb-2 text-[#2d2d2d] leading-tight">
            {event.name}
          </h1>
          <h3 className="text-2xl font-bold mb-2 text-[#4b00b0]">
            {event.artist}
          </h3>
          <h4 className="text-lg font-semibold mb-4 text-gray-700">
            {event.location}
          </h4>
          <p className="text-gray-800 mb-8 max-w-2xl text-center">
            {event.description}
          </p>
          <div className="mt-2">
            {token ? (
              <Link
                to={`/checkout/${event.id}`}
                className="inline-block text-base font-semibold text-white bg-[#7c00e2] px-8 py-3 rounded-lg shadow-lg hover:bg-[#4b00b0] transition"
              >
                Ver entradas
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-block text-base font-semibold text-[#7c00e2] underline hover:text-[#4b00b0] transition"
              >
                Ingresar / Registrarse
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
