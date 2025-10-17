import {useEffect, useState} from "react";

export const useEventDetail = (id) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/event/${id}`);
        if (!res.ok) {
          setEvent(null);
        } else {
          const data = await res.json();
          setEvent(data);
        }
      } catch (error) {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  return {event, loading};
};
