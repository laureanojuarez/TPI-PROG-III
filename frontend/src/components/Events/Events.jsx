import { Link } from "react-router-dom";
import { events } from "../../mock/events";

export const EventHero = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="w-full cursor-pointer">
      <section className="relative flex items-center justify-center rounded-lg overflow-hidden ">
        <img
          src={event.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105 aspect-auto"
        />
      </section>
    </Link>
  );
};

export const EventHeroList = () => {
  return (
    <div className="flex flex-col gap-4 ">
      {events.map((event) => (
        <EventHero key={event.id} event={event} />
      ))}
    </div>
  );
};

export const EventCard = ({
  event: { title, date, location, description },
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-1">
        {new Date(date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-1">{location}</p>
      <p className="text-gray-800">{description}</p>
    </div>
  );
};
