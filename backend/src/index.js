import express from "express";
import eventsRoutes from "./routes/events.routes.js";
import {sequelize} from "./db.js";
import {PORT} from "./config.js";

import "./models/Event.js";
const app = express();

app.use(express.json());
app.use(eventsRoutes);

try {
  await sequelize.sync();
  app.listen(PORT, () => console.log("Server listening on port", PORT));
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
