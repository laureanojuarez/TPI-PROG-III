import { useContext, useState } from "react";
import { AuthContext } from "../../services/auth/auth.context";

export default function Admin() {
  const { token } = useContext(AuthContext);

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    artist: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/event", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(eventData),
      });
      const data = await res.json();
      console.log("Evento creado:", data);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel Admin</h1>
        <p className="text-gray-600">
          Aquí puedes gestionar usuarios, eventos y más.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <h2>Agregar Evento</h2>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleChange}
            />

            <label htmlFor="description">Descripcion:</label>
            <input
              type="text"
              name="description"
              value={eventData.description}
              onChange={handleChange}
            />

            <label htmlFor="location">Ubicacion:</label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
            />

            <label htmlFor="date">Fecha:</label>
            <input
              type="text"
              name="date"
              value={eventData.date}
              onChange={handleChange}
            />

            <label htmlFor="artist">Artista:</label>
            <input
              type="text"
              name="artist"
              value={eventData.artist}
              onChange={handleChange}
            />

            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
