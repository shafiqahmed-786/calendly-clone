export const dynamic = "force-dynamic";

async function getEventTypes() {
  const res = await fetch("http://localhost:5000/event-types", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Dashboard() {
  const events = await getEventTypes();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Event Types
        </h1>
        <p className="text-gray-500 mt-1">
          Manage how people book time with you
        </p>
      </div>

      {/* Empty state */}
      {events.length === 0 && (
        <div className="border border-dashed rounded-lg p-10 text-center bg-white">
          <p className="text-gray-600">
            No event types created yet.
          </p>
        </div>
      )}

      {/* Event cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white border rounded-xl p-6 hover:shadow-sm transition"
          >
            <h2 className="text-lg font-medium text-gray-900">
              {event.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {event.duration} minutes
            </p>

            <div className="mt-4">
              <a
                href={`/book/${event.slug}`}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View booking page →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
