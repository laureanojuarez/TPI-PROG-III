import {useCallback, useEffect, useState} from "react";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/event");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {events, loading, refetch: fetchEvents};
};
