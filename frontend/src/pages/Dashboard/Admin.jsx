import {useContext, useState} from "react";
import {AuthContext} from "../../services/auth/auth.context";
import {useEvents} from "../../hooks/useEvents";
import {Navigate} from "react-router-dom";

const initialEventData = {
  name: "",
  description: "",
  location: "",
  date: "",
  artist: "",
  poster: "",
  posterHorizontal: "",
};

export default function Admin() {
  const {token, user} = useContext(AuthContext);
  const {events, loading, refetch} = useEvents();
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventData, setEventData] = useState(initialEventData);

  if (user && user.role !== "admin" && user.role !== "superadmin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="text-xl text-gray-600">Cargando...</span>
      </div>
    );
  }

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
      await res.json();
      setEditingEvent(null);
      setEventData(initialEventData);
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
      await res.json();
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
      posterHorizontal: event.posterHorizontal,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header igual que Profile/Dashboard */}
      <div className="w-full h-44 bg-gradient-to-r from-blue-800 to-blue-950 flex items-end">
        <div className="max-w-5xl w-full mx-auto px-6 pb-6 flex flex-wrap items-end gap-4">
          <div className="text-white">
            <h2 className="text-2xl font-bold">Panel Admin</h2>
            <p className="text-sm opacity-90">
              Gestiona usuarios, eventos y más.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {editingEvent ? "Editar Evento" : "Agregar Nuevo Evento"}
          </h1>
          <form
            onSubmit={editingEvent ? handleEdit : handleCreate}
            className="bg-gray-50 rounded-lg p-6 shadow mb-8"
          >
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
                <input
                  type="text"
                  name="posterHorizontal"
                  id="posterHorizontal"
                  placeholder="https://ejemplo.com/poster-horizontal.jpg"
                  value={eventData.posterHorizontal}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-2"
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
                  setEventData(initialEventData);
                }}
              >
                Cancelar edición
              </button>
            )}
          </form>

          <section>
            <h2 className="text-2xl font-bold mb-4 mt-8">Eventos Existentes</h2>
            {loading ? (
              <p>Cargando eventos...</p>
            ) : events.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="flex flex-col md:flex-row items-start md:items-center border rounded-xl p-4 bg-gray-50 shadow-sm"
                  >
                    <div className="flex-1 mb-4 md:mb-0">
                      <span className="block font-medium text-blue-700 text-lg">
                        {event.name}
                      </span>
                      <p className="text-gray-600 max-h-24 overflow-y-auto">
                        {event.description}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Fecha:</span>{" "}
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Ubicación:</span>{" "}
                        {event.location}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Artista:</span>{" "}
                        {event.artist}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500 font-semibold transition"
                        onClick={() => startEdit(event)}
                      >
                        Editar
                      </button>
                      <button
                        className="px-4 py-2 bg-red-400 rounded hover:bg-red-500 font-semibold transition"
                        onClick={() => handleDelete(event.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay eventos disponibles.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
