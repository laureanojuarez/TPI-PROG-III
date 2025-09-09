import { Router } from "express";

const router = Router();

router.get("/events", (req, res) => {
  res.send("Obteniendo eventos");
});

export default router;
