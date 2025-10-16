import { Router } from "express";
import {
  comprarEntrada,
  getAllEvents,
  getEventById,
  registerEvent,
} from "../controllers/event.controller.js";
import { verifyToken } from "../controllers/verify.controller.js";

const router = Router();

router.post("/", verifyToken, registerEvent);
router.post("/comprar", verifyToken, comprarEntrada);
router.get("/", getAllEvents);
router.get("/:id", getEventById);

export default router;
