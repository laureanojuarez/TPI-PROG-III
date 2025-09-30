import logoMain from "/header-img/logoMain.png";
import {Link, useNavigate} from "react-router-dom";
import {User} from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header  py-4 px-8 fixed w-full bg-black/70 backdrop-blur-sm z-10">
      <nav className="flex flex-col items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
          <Link to={"/"} className="cursor-pointer">
            <img src={logoMain} alt="Logo" className="h-12 w-auto" />
          </Link>

          <ul className="flex cursor-pointer items-center gap-16 text-white">
            <Link to={"/soporte"} className="nav-item text-[16px]">
              Soporte
            </Link>

            {token ? (
              <>
                <Link to={"/perfil"} className="nav-item">
                  <li className="nav-item text-[16px]">Mis entradas</li>
                </Link>
                <li
                  onClick={handleLogout}
                  className="nav-item  text-[16px]"
                  style={{cursor: "pointer"}}
                >
                  Cerrar Sesión
                </li>
              </>
            ) : (
              <Link to={"/login"} className="nav-item text-[16px]">
                Iniciar Sesión / Registrarme
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
