import express from "express";
import dotenv from "dotenv";
import slotRoutes from "./routes/slot.routes.js";

import eventTypeRoutes from "./routes/eventType.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Calendly Clone Backend is running"
  });
});

app.use("/event-types", eventTypeRoutes);
app.use("/bookings", bookingRoutes);
app.use("/availability", availabilityRoutes);
app.use("/slots", slotRoutes);

app.use(errorHandler);

export default app;
