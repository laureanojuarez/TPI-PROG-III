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
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, #c4455b 0%, #2d2d2d 100%)",
      }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-stretch bg-transparent px-4 py-10">
        <div className="md:w-2/3 flex flex-col justify-center pr-0 md:pr-10">
          <h2 className="text-lg font-semibold text-gray-200 mb-2">
            {new Date(event.date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h2>
          <h1 className="text-4xl font-extrabold mb-4 text-white">
            {event.name}
          </h1>
          <h3 className="text-2xl font-bold mb-4 text-white">{event.artist}</h3>
          <h4 className="text-xl font-semibold mb-2 text-white">
            {event.location}
          </h4>
          <p className="text-white mb-6">{event.description}</p>
          <div className="mt-4">
            {token ? (
              <Link
                to={`/checkout/${event.id}`}
                className="inline-block text-base font-semibold text-white bg-indigo-600 px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Ver entradas
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-block text-base font-semibold text-indigo-200 underline"
              >
                Ingresar / Registrarse
              </Link>
            )}
          </div>
        </div>
        <div className="md:w-1/3 flex items-center justify-center mt-8 md:mt-0">
          <img
            src={event.poster}
            alt={event.name}
            className="rounded-lg shadow-2xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
