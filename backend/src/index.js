import express from "express";
import eventsRoutes from "./routes/events.routes.js";

const app = express();

const port = 3000;

app.listen(port);
app.use(eventsRoutes);

console.log(`Server running on port ${port}`);
