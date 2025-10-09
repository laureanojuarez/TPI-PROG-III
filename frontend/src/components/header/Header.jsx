import logoMain from "/header-img/logoMain.png";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../services/auth/auth.context";

export const Header = () => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const { handleUserLogout } = useContext(AuthContext);

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  return (
    <header className="header fixed w-full bg-[#000] backdrop-blur-sm z-10">
      <nav className="flex flex-col items-center justify-between w-full px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <Link to={"/"} className="cursor-pointer">
            <img src={logoMain} alt="Logo" className="h-12 w-auto" />
          </Link>

          <Menu
            color="white"
            cursor="pointer"
            onClick={handleMenuToggle}
            className="md:hidden"
          />

          <ul className="hidden cursor-pointer items-center gap-16 text-white md:flex">
            <Link to={"/soporte"} className="nav-item text-[16px]">
              Soporte
            </Link>

            {token ? (
              <>
                <Link to={"/dashboard"} className="nav-item">
                  <li className="nav-item text-[16px]">Mis entradas</li>
                </Link>
                <li
                  onClick={handleUserLogout}
                  className="nav-item  text-[16px]"
                  style={{ cursor: "pointer" }}
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
      <nav
        className={`w-full bg-black overflow-hidden transition-all duration-300 ease-out text-white ${
          open ? "max-h-24" : "max-h-0"
        } md:hidden`}
        style={{ height: open ? "6rem" : "0" }}
      >
        {/* Contenido del menú */}
        <h1>HOLA</h1>
      </nav>
      <hr className="w-full h-px border-0 bg-gradient-to-r from-transparent via-white/20 to-transparent my-3" />
    </header>
  );
};
