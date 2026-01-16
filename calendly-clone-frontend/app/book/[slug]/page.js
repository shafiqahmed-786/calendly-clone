"use client";

import { useState } from "react";

export default function BookingPage({ params }) {
  const { slug } = params;

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  async function loadSlots(d) {
    setDate(d);
    setSelected(null);

    const res = await fetch(
      `http://localhost:5000/slots?slug=${slug}&date=${d}`
    );
    const data = await res.json();
    setSlots(data);
  }

  async function confirmBooking() {
    await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inviteeName: name,
        inviteeEmail: email,
        date,
        startTime: selected.start,
        endTime: selected.end,
      }),
    });

    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="max-w-xl mx-auto text-center mt-20">
        <h1 className="text-2xl font-semibold text-gray-900">
          Booking confirmed 🎉
        </h1>
        <p className="text-gray-600 mt-2">
          You’re scheduled. A confirmation email will be sent.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
      {/* Left column */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Select a date
        </h1>

        <input
          type="date"
          className="mt-4 border rounded-md p-2 w-full"
          onChange={(e) => loadSlots(e.target.value)}
        />

        {date && slots.length === 0 && (
          <p className="text-gray-500 mt-4">
            No available slots for this date.
          </p>
        )}

        <div className="mt-6 space-y-2">
          {slots.map((slot) => (
            <button
              key={slot.start}
              onClick={() => setSelected(slot)}
              className={`w-full border rounded-md p-2 text-left ${
                selected?.start === slot.start
                  ? "border-blue-600 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              {slot.start} – {slot.end}
            </button>
          ))}
        </div>
      </div>

      {/* Right column */}
      {selected && (
        <div className="bg-white border rounded-xl p-6 h-fit">
          <h2 className="text-lg font-medium text-gray-900">
            Enter your details
          </h2>

          <input
            placeholder="Name"
            className="border rounded-md p-2 w-full mt-4"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="border rounded-md p-2 w-full mt-3"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={confirmBooking}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Confirm booking
          </button>
        </div>
      )}
    </div>
  );
}
