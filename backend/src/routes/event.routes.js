import { Router } from "express";
import {
  comprarEntrada,
  getAllEvents,
  registerEvent,
} from "../controllers/event.controller.js";
import { verifyToken } from "../controllers/verify.controller.js";

const router = Router();

router.post("/", registerEvent);
router.get("/", getAllEvents);
router.post("/comprar", verifyToken, comprarEntrada);

export default router;
