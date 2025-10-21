import logoMain from "/header-img/logoMain.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../services/auth/auth.context";

export const Header = () => {
  const { token, handleUserLogout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleMenuToggle = () => setOpen((prev) => !prev);
  const handleCloseMenu = () => setOpen(false);

  return (
    <>
      <header className="fixed w-full bg-black/70 backdrop-blur-sm z-10 py-3 flex items-center justify-between px-6 shadow">
        <Link to="/" className="cursor-pointer flex items-center gap-2">
          <img src={logoMain} alt="Logo" className="h-12 w-auto" />
        </Link>
        <nav className="flex items-center">
          <ul className="hidden md:flex items-center gap-10 text-white font-medium">
            <li>
              <Link to="/soporte" className="hover:text-indigo-400 transition">
                Soporte
              </Link>
            </li>
            {token ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-indigo-400 transition"
                  >
                    Mis entradas
                  </Link>
                </li>
                <li>
                  <Link to={"/perfil"}>Mi cuenta</Link>
                </li>
                <li>
                  <button
                    onClick={handleUserLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition"
                >
                  Iniciar Sesión / Registrarme
                </Link>
              </li>
            )}
          </ul>

          <button
            className="md:hidden ml-4 text-white"
            onClick={handleMenuToggle}
            aria-label="Abrir menú"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        <nav
          className={`absolute top-full left-0 w-full bg-black/95 text-white transition-all duration-300 ease-in-out overflow-hidden md:hidden shadow-lg ${
            open ? "max-h-60 py-4" : "max-h-0 py-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-4">
            <li>
              <Link
                to="/soporte"
                onClick={handleCloseMenu}
                className="hover:text-indigo-400 transition"
              >
                Soporte
              </Link>
            </li>
            {token ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    onClick={handleCloseMenu}
                    className="hover:text-indigo-400 transition"
                  >
                    Mis entradas
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleUserLogout();
                      handleCloseMenu();
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  onClick={handleCloseMenu}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition"
                >
                  Iniciar Sesión / Registrarme
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <div className="h-20" /> {/* Espaciador para el header fijo */}
      <hr className="w-full h-px border-0 bg-gradient-to-r from-transparent via-white/20 to-transparent my-3" />
    </>
  );
};
