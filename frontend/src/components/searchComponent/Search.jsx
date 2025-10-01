import { useState } from "react";

export const Search = ({ onSearch }) => {
  const [input, setInput] = useState('')

  const handleSearch = (event) => {
    if (event.key === 'Enter' && input.trim !== '') {
      onSearch(input);
    }
  }
  return (
    <div className="w-full p-4 flex justify-center">
      <input type="text" onChange={(e) => setInput(e.target.value)} onKeyDown={handleSearch} placeholder="Busca por evento o artista!" className="w-full max-w-md border border-black p-2 rounded-lg transition-colors shadow-xl focus:outline-none focus:border-[#7c00e2] focus:ring-2 focus:ring-[#7c00e2] focus:bg-[#f3f4f6]"  />
    </div>
  )
}
