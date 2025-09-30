import logoMain from "/header-img/logoMain.png";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

export const Header = () => {
  return (
    <header className="header  py-4 px-8 fixed w-full bg-black/90 backdrop-blur-sm z-10">
      <nav className="flex flex-col items-center justify-between w-full">
        <div className="flex items-center justify-between w-full gap-8">
          <Link to={"/"} className="cursor-pointer">
            <img src={logoMain} alt="Logo" className="h-12 w-auto" />
          </Link>

          <ul className="flex cursor-pointer items-center gap-8">
            <Link
              to={"/soporte"}
              className="nav-item text-white font-semibold text-[16px]"
            >
              Soporte
            </Link>

            <Link to={"/perfil"} className="nav-item ">
              <User color="white" />
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};
