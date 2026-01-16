export default function Home() {
  return (
    <div className="text-center mt-24">
      <h1 className="text-4xl font-semibold mb-4">
        Easy Scheduling Ahead
      </h1>
      <p className="text-gray-600 mb-8">
        Let people book time with you — without emails.
      </p>

      <a
        href="/dashboard"
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Go to Dashboard
      </a>
    </div>
  );
}
