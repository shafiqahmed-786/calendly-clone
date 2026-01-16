export const dynamic = "force-dynamic";

async function getMeetings() {
  const res = await fetch("http://localhost:5000/bookings/meetings", {
    cache: "no-store",
  });
  return res.json();
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Meetings</h1>

      {meetings.length === 0 && (
        <p className="text-gray-600">No meetings yet.</p>
      )}

      <div className="space-y-4">
        {meetings.map((m) => (
          <div key={m.id} style={{ border: "1px solid #ddd", padding: 12 }}>
            <p><strong>{m.inviteeName}</strong></p>
            <p>{new Date(m.date).toDateString()}</p>
            <p>{m.startTime} – {m.endTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
