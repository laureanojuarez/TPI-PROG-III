import {useContext} from "react";
import {Link, useParams} from "react-router-dom";
import {AuthContext} from "../../services/auth/auth.context";
import {useEventDetail} from "../../hooks/useEventDetail";

export default function EventDetail() {
  const {token} = useContext(AuthContext);
  const {id} = useParams();
  const {event, loading} = useEventDetail(id);

  if (!event) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center bg-gray-100 w-full min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Evento no encontrado</h1>
        <Link to="/" className="text-indigo-600">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-20">
      <div className="">
        <img src={event.poster} alt={event.name} className="w-96" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
          <p className="text-gray-600 mb-4">
            {event.location} · {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-800 mb-6">{event.description}</p>

          {token ? (
            <Link
              to={`/checkout/${event.id}`}
              className="inline-block text-sm text-white bg-indigo-600 px-4 py-2 rounded"
            >
              Comprar
            </Link>
          ) : (
            <Link to="/login">
              Para comprar entradas tenes que iniciar sesion
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
