import logoMain from "/header-img/logoMain.png";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
                <Link to={"/perfil"} className="nav-item">
                  <li className="nav-item text-[16px]">Mis entradas</li>
                </Link>
                <li
                  onClick={handleLogout}
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
        className={`w-full bg-black overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-24" : "max-h-0"
        } md:hidden`}
        style={{ height: open ? "6rem" : "0" }}
      >
        {/* Contenido del menú */}
      </nav>
      <hr className="w-full h-px border-0 bg-gradient-to-r from-transparent via-white/20 to-transparent my-3" />
    </header>
  );
};
