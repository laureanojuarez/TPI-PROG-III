import { Op } from "sequelize";
import { Evento } from "../models/Evento.js";

export const getEvents = async (req, res) => {
  const { q } = req.query;
  console.log("CONSULTA", q);
  try {
    const events = await Evento.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } },
        ],
      },
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar eventos", error });
  }
};
