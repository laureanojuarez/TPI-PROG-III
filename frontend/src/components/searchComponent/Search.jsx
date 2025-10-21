import { useState } from "react";
import { filterSearch } from "./filterSearch";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    if (event.key === "Enter" && input.trim() !== "") {
      const results = await filterSearch(input);

      if (results) {
        navigate("/resultados", { state: { resultados: results } });
      }
      console.log(results);
    }
  };
  return (
    <div className="w-full pb-8 pt-10 flex  items-center max-w-2xl mx-auto">
      <label htmlFor="search" className="sr-only">
        Buscar evento o artista
      </label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Busca por evento o artista"
        className="flex-1 border bg-white border-gray-300  rounded-l-lg transition-colors shadow focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 focus:bg-gray-50 py-2 px-4"
      />
      <button
        onClick={async () => {
          if (input.trim() !== "") {
            const results = await filterSearch(input);
            if (results) {
              navigate("/resultados", { state: { resultados: results } });
            }
          }
        }}
        className="bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-r-lg font-semibold hover:bg-gray-100 transition"
      >
        Buscar
      </button>
    </div>
  );
};
