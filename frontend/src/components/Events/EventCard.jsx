import { Link } from "react-router-dom";

export const EventCard = ({ event: { id, name, poster } }) => {
  return (
    <Link
      to={`/event/${id}`}
      className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <img src={poster} alt={name} width={"500px"} />
    </Link>
  );
};
