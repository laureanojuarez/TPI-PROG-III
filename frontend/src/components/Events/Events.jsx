import {Link} from "react-router-dom";

export const EventCard = ({
  event: {id, name, date, location, description, artist, poster},
}) => {
  return (
    <Link to={`/event/${id}`} className="w-full cursor-pointer">
      <div className="bg-white rounded-lg shadow-md p-4">
        <img src={poster} alt="" />
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-gray-600 mb-1">
          {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-1">{location}</p>
        <p className="text-gray-800">{description}</p>
        <p>{artist}</p>
      </div>
    </Link>
  );
};
