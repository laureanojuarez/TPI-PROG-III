import {useEffect, useState} from "react";
import {EventCard, EventHeroList} from "../../components/Events/Events";
import {Search} from "../../components/searchComponent/Search";
export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 ">
      <Search />
      <section className="flex flex-col w-full  gap-4 px-4 py-2">
        <EventHeroList />
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No hay eventos disponibles.
          </p>
        )}
      </section>
    </div>
  );
}
