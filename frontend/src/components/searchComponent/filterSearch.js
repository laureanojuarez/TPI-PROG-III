export const filterSearch = async (data) => {
  try {
    const response = await fetch(`http://localhost:3000/search?q=${data}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error en la busqueda", err);
  }
  return null;
};
