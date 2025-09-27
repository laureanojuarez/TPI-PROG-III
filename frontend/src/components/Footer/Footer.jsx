export const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 px-8 flex flex-col items-center">
      <span className="font-bold text-lg mb-1">Eventos Pass</span>
      <span className="text-xs text-white">
        © {new Date().getFullYear()} Todos los derechos reservados.
      </span>
    </footer>
  );
};
