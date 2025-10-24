import {useCallback, useEffect, useState} from "react";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/event");
      if (!res.ok) throw new Error("Error al cargar eventos");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      setEvents([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {events, loading, error, refetch: fetchEvents};
};
