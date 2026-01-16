import { prisma } from "../config/db.js";
import { generateSlots } from "../services/slot.service.js";
import { parseISO, setHours, setMinutes } from "date-fns";

export async function getSlots(req, res) {
  const { slug, date } = req.query;

  if (!slug || !date) {
    return res.status(400).json({ error: "slug and date are required" });
  }

  // 1️⃣ Get event type
  const eventType = await prisma.eventType.findUnique({
    where: { slug }
  });

  if (!eventType) {
    return res.status(404).json({ error: "Event type not found" });
  }

  const selectedDate = parseISO(date);
  const dayOfWeek = selectedDate.getDay(); // 0 = Sunday

  // 2️⃣ Check date override
  const override = await prisma.dateOverride.findFirst({
    where: {
      date: selectedDate
    }
  });

  if (override?.isUnavailable) {
    return res.json([]);
  }

  // 3️⃣ Get active availability schedule
  const schedule = await prisma.availabilitySchedule.findFirst({
    where: {
      userId: eventType.userId,
      isActive: true
    },
    include: {
      availabilities: true
    }
  });

  if (!schedule) {
    return res.json([]);
  }

  // 4️⃣ Get availability for this day
  const availability = schedule.availabilities.find(
    a => a.dayOfWeek === dayOfWeek
  );

  if (!availability) {
    return res.json([]);
  }

  // 5️⃣ Convert availability times to Date objects
  const start = setMinutes(
    setHours(selectedDate, Number(availability.startTime.split(":")[0])),
    Number(availability.startTime.split(":")[1])
  );

  const end = setMinutes(
    setHours(selectedDate, Number(availability.endTime.split(":")[0])),
    Number(availability.endTime.split(":")[1])
  );

  // 6️⃣ Get existing bookings
  const bookings = await prisma.booking.findMany({
    where: {
      eventTypeId: eventType.id,
      date: selectedDate,
      status: "CONFIRMED"
    }
  });

  const formattedBookings = bookings.map(b => ({
    start: setMinutes(
      setHours(selectedDate, Number(b.startTime.split(":")[0])),
      Number(b.startTime.split(":")[1])
    ),
    end: setMinutes(
      setHours(selectedDate, Number(b.endTime.split(":")[0])),
      Number(b.endTime.split(":")[1])
    )
  }));

  // 7️⃣ Generate slots
  const slots = generateSlots({
    date: selectedDate,
    availability: { start, end },
    bookings: formattedBookings,
    duration: eventType.duration,
    bufferBefore: eventType.bufferBefore,
    bufferAfter: eventType.bufferAfter
  });

  // 8️⃣ Return formatted slots
  res.json(
    slots.map(s => ({
      start: s.start.toTimeString().slice(0, 5),
      end: s.end.toTimeString().slice(0, 5)
    }))
  );
}
