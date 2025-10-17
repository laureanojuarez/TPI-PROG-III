import {Router} from "express";
import {
  comprarEntrada,
  deleteEvent,
  getAllEvents,
  getEventById,
  registerEvent,
} from "../controllers/event.controller.js";
import {verifyToken} from "../controllers/verify.controller.js";

const router = Router();

router.post("/", verifyToken, registerEvent); // Agregar Evento
router.get("/", getAllEvents); // Obtener Todos los Eventos
router.get("/:id", getEventById); // Obtener Evento por ID
router.delete("/:id", verifyToken, deleteEvent); // Eliminar Evento por ID

router.post("/comprar", verifyToken, comprarEntrada); // Comprar Entrada

export default router;
