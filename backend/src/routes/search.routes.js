import { Router } from "express";
import { getEvents } from "../controllers/search.controller.js";
const router = Router();

router.get("/", getEvents);
export default router;
