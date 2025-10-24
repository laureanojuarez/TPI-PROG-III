import {useEffect, useState} from "react";

export const useEventDetail = (id) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/event/${id}`);
        if (!res.ok) {
          throw new Error("Evento no encontrado");
        }
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        setEvent(null);
        setError(error.message);
        console.error("Error al cargar el detalle del evento:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  return {event, loading, error};
};
