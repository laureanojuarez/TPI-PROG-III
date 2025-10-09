import { Evento } from "../models/Evento.js";

export const registerEvent = async (req, res) => {
  const { name, description, date, location, artist } = req.body;

  try {
    const newEvent = await Evento.create({
      name,
      description,
      date,
      location,
      artist,
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
