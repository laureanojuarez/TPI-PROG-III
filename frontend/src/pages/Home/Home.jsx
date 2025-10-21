import { EventCard } from "../../components/Events/Events";
import { Search } from "../../components/searchComponent/Search";
import { useEvents } from "../../hooks/useEvents";
export default function Home() {
  const { events, loading } = useEvents();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 ">
      <Search />
      <section className="flex flex-col w-full  gap-4 px-4 py-2">
        {loading ? (
          <div className="h-96 flex items-center justify-center rounded-md">
            <p className="text-center text-gray-700 ">Cargando eventos...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
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
    </div>
  );
}
