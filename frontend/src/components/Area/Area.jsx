import AreaSVG from "../../assets/area.svg?react";
import "./area.css";

export const Area = ({ setArea }) => {
  const handleAreaClick = (e) => {
    const group = e.target.closest("g");
    const id = group?.id;

    if (id === "bg-vip") {
      setArea("Sector VIP");
    }

    if (id === "bg-general") {
      setArea("General");
    }
  };
  return <AreaSVG onClick={handleAreaClick} className="w-96 h-96" />;
};
