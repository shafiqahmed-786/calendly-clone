const API = process.env.NEXT_PUBLIC_API_URL;

// Event types
export async function fetchEventTypes() {
  const res = await fetch(`${API}/event-types`);
  return res.json();
}

// Slots
export async function fetchSlots(slug, date) {
  const res = await fetch(
    `${API}/slots?slug=${slug}&date=${date}`
  );
  return res.json();
}

// Create booking
export async function createBooking(data) {
  const res = await fetch(`${API}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

// Meetings
export async function fetchMeetings() {
  const res = await fetch(`${API}/bookings/meetings`);
  return res.json();
}
