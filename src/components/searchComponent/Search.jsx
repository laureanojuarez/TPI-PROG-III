export const Search = ({ data }) => {
  return (
    <div>
      <input
        type="search"
        className="w-[350px] md:w-[500px]  text-white px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-purple shadow-sm transition-all duration-200 text-gray-800 placeholder-gray-400"
        placeholder="Busca un Artista o Evento"
      />
    </div>
  );
};
