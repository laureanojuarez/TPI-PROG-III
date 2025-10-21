import { DetalleVenta } from "../models/DetalleVenta.js";
import { Evento } from "../models/Evento.js";
import { User } from "../models/User.js";

export const registerEvent = async (req, res) => {
  const {
    name,
    description,
    date,
    location,
    artist,
    poster,
    posterHorizontal,
  } = req.body;

  try {
    const newEvent = await Evento.create({
      name,
      description,
      date,
      location,
      artist,
      poster,
      posterHorizontal,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Evento.findAll();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Evento.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Evento.destroy({
      where: { id },
    });

    if (deleted) {
      return res.status(200).json({ message: "Evento eliminado" });
    }

    res.status(404).json({ message: "Evento no encontrado" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    date,
    location,
    artist,
    poster,
    posterHorizontal,
  } = req.body;

  try {
    const [updated] = await Evento.update(
      { name, description, date, location, artist, poster, posterHorizontal },
      { where: { id } }
    );

    if (updated) {
      const updatedEvent = await Evento.findByPk(id);
      return res.status(200).json(updatedEvent);
    }

    res.status(404).json({ message: "Evento no encontrado" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const comprarEntrada = async (req, res) => {
  try {
    const { id_evento, sector, cantidad, subtotal } = req.body;
    const { email } = req;

    if (!id_evento || !sector || !cantidad || !subtotal) {
      return res
        .status(400)
        .json({ message: "Faltan datos obligatorios para la compra" });
    }
    const sectoresValidos = ["General", "VIP"];
    if (!sectoresValidos.includes(sector)) {
      return res.status(400).json({ message: "Sector inválido" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Verifica que el evento exista
    const evento = await Evento.findByPk(id_evento);
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Crea el detalle de venta
    const detalle = await DetalleVenta.create({
      id_evento,
      id_usuario: user.id,
      sector,
      cantidad,
      subtotal,
    });

    res.status(201).json({ message: "Compra realizada", detalle });
  } catch (error) {
    console.error("Error al comprar entrada:", error);
    res.status(500).json({ message: "Error al comprar entrada", error });
  }
};
