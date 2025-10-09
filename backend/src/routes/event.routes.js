import { Router } from "express";
import {
  getAllEvents,
  registerEvent,
} from "../controllers/event.controller.js";

const router = Router();

router.post("/", registerEvent);
router.get("/", getAllEvents);

export default router;
