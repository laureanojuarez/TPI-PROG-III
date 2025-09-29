import express from "express";
import eventsRoutes from "./routes/events.routes.js";
import { sequelize } from "./db.js";
import { PORT } from "./config.js";
import cors from "cors";

import "./models/Event.js";
import "./models/User.js";
import "./models/Pago.js";
import "./models/EventosUsuario.js";
import authRoutes from "./routes/auth.routes.js";
import { json } from "sequelize";

const app = express();
app.use(cors());
app.use(json());

app.use(express.json());
app.use(eventsRoutes);
app.use("/auth", authRoutes);

try {
  await sequelize.sync();
  app.listen(PORT, () => console.log("Server listening on port", PORT));
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
