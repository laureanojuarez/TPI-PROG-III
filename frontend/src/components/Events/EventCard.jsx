import {Link} from "react-router-dom";

export const EventCard = ({event: {id, name, poster, location, date}}) => {
  return (
    <Link
      to={`/event/${id}`}
      className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 p-4"
    >
      <img src={poster} alt={name} className=" md:h-[400px] md:object-cover" />
      <h2 className="text-2xl">{name}</h2>
      <p className="text-lg">📍 {location}</p>
      <p className="text-lg">📅 {new Date(date).toLocaleDateString()}</p>
    </Link>
  );
};
