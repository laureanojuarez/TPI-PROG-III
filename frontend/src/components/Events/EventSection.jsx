import { useEvents } from "../../hooks/useEvents";
import { EventCard } from "./EventCard";

export const EventSection = () => {
  const { events, loading } = useEvents();

  return (
    <section className="flex flex-col w-full  items-center gap-4 px-4 py-4 min-h-screen bg-gray-100 max-w-8xl">
      {loading ? (
        <div className="h-96 flex items-center justify-center rounded-md">
          <p className="text-center text-gray-700 ">Cargando eventos...</p>
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="h-96 flex items-center justify-center rounded-md">
          <p className="text-center text-gray-700 ">
            No hay eventos disponibles.
          </p>
        </div>
      )}
    </section>
  );
};
