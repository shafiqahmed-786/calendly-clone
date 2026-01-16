import { prisma } from "../config/db.js";
import { v4 as uuid } from "uuid";

export async function createBooking(data) {
  const existing = await prisma.booking.findFirst({
    where: {
      eventTypeId: data.eventTypeId,
      date: data.date,
      startTime: data.startTime,
      status: "CONFIRMED"
    }
  });

  if (existing) {
    throw new Error("Slot already booked");
  }

  return prisma.booking.create({
    data: {
      ...data,
      rescheduleToken: uuid()
    }
  });
}
