import {Link} from "react-router-dom";

export const EventCard = ({event: {id, name, poster}}) => {
  return (
    <Link
      to={`/event/${id}`}
      className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 "
    >
      <img src={poster} alt={name} className=" md:h-[400px] md:object-cover" />
    </Link>
  );
};
