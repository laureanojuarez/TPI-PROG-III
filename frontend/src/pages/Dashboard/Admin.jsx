import {useContext, useState} from "react";
import {AuthContext} from "../../services/auth/auth.context";
import {useEvents} from "../../hooks/useEvents";

export default function Admin() {
  const {token} = useContext(AuthContext);
  const {events, loading, refetch} = useEvents();
  const [editingEvent, setEditingEvent] = useState(null);

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    artist: "",
    poster: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEventData({...eventData, [name]: value});
  };

  const handleCreate = async (e) => {
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
      refetch();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/event/${editingEvent.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(eventData),
        }
      );
      const data = await res.json();
      console.log("Evento actualizado:", data);
      setEditingEvent(null);
      setEventData({
        name: "",
        description: "",
        location: "",
        date: "",
        artist: "",
        poster: "",
      });
      refetch();
    } catch (error) {
      console.error("Error al editar el evento:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "¿Estas seguro de que deseas eliminar este evento?"
      );
      if (!confirmed) return;

      const res = await fetch(`http://localhost:3000/event/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("Evento eliminado:", data);
      refetch();
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };

  const startEdit = (event) => {
    setEditingEvent(event);
    setEventData({
      name: event.name,
      description: event.description,
      location: event.location,
      date: event.date.slice(0, 10),
      artist: event.artist,
      poster: event.poster,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel Admin</h1>
        <p className="text-gray-600">
          Aquí puedes gestionar usuarios, eventos y más.
        </p>
        <form
          onSubmit={editingEvent ? handleEdit : handleCreate}
          className="bg-gray-50 rounded-lg p-6 shadow mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
            <span>🎫</span>{" "}
            {editingEvent ? "Editar Evento" : "Agregar Nuevo Evento"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Nombre del evento
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Ej: Festival Primavera"
                value={eventData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="artist"
                className="block text-gray-700 font-medium mb-1"
              >
                Artista principal
              </label>
              <input
                type="text"
                name="artist"
                id="artist"
                placeholder="Ej: Soda Stereo"
                value={eventData.artist}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-gray-700 font-medium mb-1"
              >
                Ubicación
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Ej: Teatro Colón"
                value={eventData.location}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-gray-700 font-medium mb-1"
              >
                Fecha
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={eventData.date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="poster"
                className="block text-gray-700 font-medium mb-1"
              >
                URL del poster
              </label>
              <input
                type="text"
                name="poster"
                id="poster"
                placeholder="https://ejemplo.com/poster.jpg"
                value={eventData.poster}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-1"
              >
                Descripción
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Contanos sobre el evento..."
                value={eventData.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows={3}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
          >
            {editingEvent ? "Guardar Cambios" : "Crear Evento"}
          </button>
          {editingEvent && (
            <button
              type="button"
              className="mt-2 w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded hover:bg-gray-400 transition"
              onClick={() => {
                setEditingEvent(null);
                setEventData({
                  name: "",
                  description: "",
                  location: "",
                  date: "",
                  artist: "",
                  poster: "",
                });
              }}
            >
              Cancelar edicion
            </button>
          )}
        </form>

        <section>
          <h2 className="text-2xl font-bold mb-4 mt-8">Eventos Existentes</h2>
          {loading ? (
            <p>Cargando eventos...</p>
          ) : events.length > 0 ? (
            <ul className="space-y-2">
              {events.map((event) => (
                <div className="flex border rounded mb-4" key={event.id}>
                  <li className="p-3 bg-gray-50 w-full">
                    <span className="font-medium text-blue-700">
                      {event.name}
                    </span>
                    <p className="text-gray-600">{event.description}</p>
                    <p className="text-gray-600">
                      Fecha: {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">Ubicación: {event.location}</p>
                    <p className="text-gray-600">Artista: {event.artist}</p>
                  </li>
                  <button
                    className="flex items-center justify-center text-center p-4 bg-yellow-400 cursor-pointer"
                    onClick={() => startEdit(event)}
                  >
                    <p>Editar evento</p>
                  </button>
                  <button
                    className="flex items-center justify-center text-center p-4 bg-red-400 cursor-pointer"
                    onClick={() => handleDelete(event.id)}
                  >
                    <p>Eliminar evento</p>
                  </button>
                </div>
              ))}
            </ul>
          ) : (
            <p>No hay eventos disponibles.</p>
          )}
        </section>
      </div>
    </div>
  );
}
