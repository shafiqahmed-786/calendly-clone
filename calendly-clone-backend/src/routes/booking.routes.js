import express from "express";
import {
  bookSlot,
  getMeetings,
  rescheduleBooking
} from "../controllers/booking.controller.js";

const router = express.Router();

/**
 * Create a new booking
 * POST /bookings
 */
router.post("/", bookSlot);

/**
 * Get all confirmed meetings (admin)
 * GET /bookings/meetings
 */
router.get("/meetings", getMeetings);

/**
 * Reschedule an existing booking using token
 * POST /bookings/reschedule/:token
 */
router.post("/reschedule/:token", rescheduleBooking);

export default router;
