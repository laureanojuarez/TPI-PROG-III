import express from "express";
import { sequelize } from "./db.js";
import { PORT } from "./config.js";
import cors from "cors";

import "./models/Evento.js";
import "./models/User.js";
import "./models/DetalleVenta.js";
import { User } from "./models/User.js";
import { DetalleVenta } from "./models/DetalleVenta.js";
import { Evento } from "./models/Evento.js";

User.hasMany(DetalleVenta, { foreignKey: "userId" });
DetalleVenta.belongsTo(User, { foreignKey: "userId" });

Evento.hasMany(DetalleVenta, { foreignKey: "eventoId" });
DetalleVenta.belongsTo(Evento, { foreignKey: "eventoId" });

import authRoutes from "./routes/auth.routes.js";
import searchRoutes from "./routes/search.routes.js";
import eventRoutes from "./routes/event.routes.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/event", eventRoutes);
app.use("/search", searchRoutes);

try {
  await sequelize.sync();
  app.listen(PORT, () => console.log("Server listening on port", PORT));
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
