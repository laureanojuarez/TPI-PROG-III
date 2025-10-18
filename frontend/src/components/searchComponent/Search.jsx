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
    <div className="w-full pb-8 pt-10 flex flex-col items-center bg-[#000]">
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Busca por evento o artista!"
        className="w-full max-w-md border bg-[white] border-black p-2 rounded-lg transition-colors shadow-xl focus:outline-none focus:border-[#7c00e2] focus:ring-2 focus:ring-[#7c00e2] focus:bg-[#f3f4f6]"
      />
    </div>
  );
};
