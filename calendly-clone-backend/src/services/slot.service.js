import { addMinutes, isBefore, isEqual } from "date-fns";

export function generateSlots({
  date,
  availability,
  bookings,
  duration,
  bufferBefore,
  bufferAfter
}) {
  const slots = [];

  let current = availability.start;
  const end = availability.end;

  while (isBefore(addMinutes(current, duration), end) || isEqual(addMinutes(current, duration), end)) {
    const slotStart = current;
    const slotEnd = addMinutes(slotStart, duration);

    const blocked = bookings.some(b => {
      const bookingStart = b.start;
      const bookingEnd = b.end;

      const bufferedStart = addMinutes(bookingStart, -bufferBefore);
      const bufferedEnd = addMinutes(bookingEnd, bufferAfter);

      return (
        slotStart < bufferedEnd &&
        slotEnd > bufferedStart
      );
    });

    if (!blocked) {
      slots.push({
        start: slotStart,
        end: slotEnd
      });
    }

    current = addMinutes(current, duration);
  }

  return slots;
}
