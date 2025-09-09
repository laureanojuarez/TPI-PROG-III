import logoMain from "/header-img/logoMain.png";
export const Header = () => {
  return (
    <header className="header bg-black py-4 px-8">
      <nav className="flex flex-col items-center justify-between w-full">
        <div className="flex items-center justify-between w-full gap-8">
          <img src={logoMain} alt="Logo" className="h-12 w-auto" />
          <ul className="flex cursor-pointer items-center">
            <li className="nav-item text-white font-semibold px-6 py-2 text-[16px]">
              Soporte
            </li>
            <li className="nav-item text-white font-semibold px-6 py-2 text-[16px]">
              Registrarse/Ingresar
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
