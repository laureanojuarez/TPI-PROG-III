import { Op } from "sequelize";
import { Evento } from "../models/Evento.js";

export const getEvents = async (req, res) => {
  const { q } = req.query;
  console.log("CONSULTA", q);
  try {
    const events = await Evento.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.substring]: `%${q}%` } },
          { artist: { [Op.substring]: `%${q}%` } },
          { description: { [Op.substring]: `%${q}%` } },
        ],
      },
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar eventos", error });
  }
};
