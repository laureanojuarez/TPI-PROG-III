import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../services/auth/auth.context";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/event/${id}`);
        if (!res.ok) {
          setEvent(null);
          return;
        }
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        setEvent(null);
      }
    };
    fetchEvent();
  }, [id]);

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
    <div className="pt-20 px-6 md:px-12 pb-12 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full  object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
          <p className="text-gray-600 mb-4">
            {event.location} · {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-800 mb-6">{event.description}</p>

          {token ? (
            <Link
              to="/checkout"
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
