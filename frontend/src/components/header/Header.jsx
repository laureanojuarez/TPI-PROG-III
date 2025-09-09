export const Header = () => {
  return (
    <header className="header bg-black py-4 px-8">
      <nav className="flex justify-between w-full h-[50px] items-center px-4">
        <img src="" alt="IMAGEN FALSA BRO" className="h-8" />
        <ul className="flex gap-8 cursor-pointer p-4">
          <li className="nav-item text-white font-semibold px-6 py-2">
            Soporte
          </li>
          <li className="nav-item text-white font-semibold px-6 py-2">
            Registrarse/Ingresar
          </li>
        </ul>
      </nav>
    </header>
  );
};
