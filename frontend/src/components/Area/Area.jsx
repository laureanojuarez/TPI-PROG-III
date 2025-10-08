import AreaSVG from "../../assets/area.svg?react";
import "./area.css";

export const Area = ({ setArea }) => {
  // Maneja el click en cualquier parte del SVG
  const handleAreaClick = (e) => {
    const id = e.target.id;

    if (id === "b-sectorvip") {
      setArea("Sector VIP");
    }

    if (id === "b-general") {
      setArea("General");
    }
  };
  return <AreaSVG onClick={handleAreaClick} />;
};
