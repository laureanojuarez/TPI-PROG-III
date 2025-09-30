import { Link } from "react-router-dom";

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

export const events = [
  {
    id: 1,
    title: "Kendrick Lamar en Concierto",
    date: "2023-10-15",
    location: "Estadio River Plate",
    description:
      "La leyenda del rap y el hip hop sumará una parada en Argentina a su gira Grand National Tour el 4 de octubre en el Monumental. Será la segunda vez que se presente en un espectáculo para recorrer la trayectoria de más de 20 años dejando una huella imborrable en la industria.",
    image:
      "https://cdn.getcrowder.com/images/96121886-d264-4430-b1ca-e1a6114ead9f-1920x720-nuevo-admat.jpg",
  },
  {
    id: 2,
    title: "Lollapalooza 2025",
    date: "2023-11-05",
    location: "Hipodromo de Palermo",
    description: "Explora las últimas innovaciones en tecnología y gadgets.",
    image:
      "https://cdn.getcrowder.com/images/9a0e2384-88e1-4d94-8ba8-0d5e94b1503e-lolla-headliners-bannersaa-1920x720-min.jpg",
  },
];
