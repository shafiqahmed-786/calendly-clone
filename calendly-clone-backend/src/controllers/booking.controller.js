import { prisma } from "../config/db.js";
import { createBooking } from "../services/booking.service.js";

/**
 * Create a new booking (used by public booking page)
 * POST /bookings
 */
export async function bookSlot(req, res) {
  try {
    const {
      eventTypeId,
      inviteeName,
      inviteeEmail,
      date,
      startTime,
      endTime
    } = req.body;

    if (
      !eventTypeId ||
      !inviteeName ||
      !inviteeEmail ||
      !date ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        error: "Missing required booking fields"
      });
    }

    const booking = await createBooking({
      eventTypeId,
      inviteeName,
      inviteeEmail,
      date: new Date(date),
      startTime,
      endTime
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
}

/**
 * Get all upcoming meetings (admin view)
 * GET /bookings/meetings
 */
export async function getMeetings(req, res) {
  try {
    const meetings = await prisma.booking.findMany({
      where: {
        status: "CONFIRMED"
      },
      orderBy: {
        date: "asc"
      }
    });

    res.json(meetings);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch meetings"
    });
  }
}

/**
 * Reschedule an existing booking
 * POST /bookings/reschedule/:token
 */
export async function rescheduleBooking(req, res) {
  try {
    const { token } = req.params;
    const { newDate, newStartTime, newEndTime } = req.body;

    if (!newDate || !newStartTime || !newEndTime) {
      return res.status(400).json({
        error: "Missing reschedule details"
      });
    }

    const booking = await prisma.booking.findUnique({
      where: { rescheduleToken: token }
    });

    if (!booking) {
      return res.status(404).json({
        error: "Invalid reschedule token"
      });
    }

    // Cancel old booking
    await prisma.booking.update({
      where: { id: booking.id },
      data: { status: "CANCELLED" }
    });

    // Create new booking
    const newBooking = await createBooking({
      eventTypeId: booking.eventTypeId,
      inviteeName: booking.inviteeName,
      inviteeEmail: booking.inviteeEmail,
      date: new Date(newDate),
      startTime: newStartTime,
      endTime: newEndTime
    });

    res.json(newBooking);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
}
