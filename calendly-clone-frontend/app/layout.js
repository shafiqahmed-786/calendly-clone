import "../styles/globals.css";

export const metadata = {
  title: "Calendly Clone",
  description: "Scheduling Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <nav className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
            <span className="font-semibold text-lg">
              Calendly Clone
            </span>
            <div className="space-x-4">
              <a href="/dashboard" className="text-blue-600">
                Dashboard
              </a>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
