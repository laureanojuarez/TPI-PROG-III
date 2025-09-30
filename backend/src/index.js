import express from "express";
import { sequelize } from "./db.js";
import { PORT } from "./config.js";
import cors from "cors";

import "./models/Evento.js";
import "./models/User.js";
import "./models/Pago.js";
import "./models/DetalleVenta.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);

try {
  await sequelize.sync();
  app.listen(PORT, () => console.log("Server listening on port", PORT));
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
