export const EventHero = () => {
  return (
    <section
      className="bg-gray-400 h-72
 w-full"
    >
      evento1
    </section>
  );
};

export const EventList = () => {
  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export const EventCard = ({event: {title, date, location, description}}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-1">
        {new Date(date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-1">{location}</p>
      <p className="text-gray-800">{description}</p>
    </div>
  );
};

const events = [
  {
    id: 1,
    title: "Concierto de Rock",
    date: "2023-10-15",
    location: "Estadio Nacional",
    description:
      "Una noche llena de rock con bandas locales e internacionales.",
  },
  {
    id: 2,
    title: "Feria de Tecnología",
    date: "2023-11-05",
    location: "Centro de Convenciones",
    description: "Explora las últimas innovaciones en tecnología y gadgets.",
  },
  {
    id: 3,
    title: "Festival de Cine",
    date: "2023-12-01",
    location: "Cineplex",
    description:
      "Disfruta de una selección de películas independientes y clásicas.",
  },
];
