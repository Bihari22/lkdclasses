"use client";

const events = [
  { title: "Science Fair", date: "Feb 2023", desc: "Annual school science exhibition" },
  { title: "Sports Meet", date: "Mar 2023", desc: "Inter-school athletic competition" },
  { title: "Annual Day", date: "Apr 2023", desc: "Cultural program and awards" },
];

export default function EventsSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow p-4 hover:shadow-xl transition">
            <h3 className="font-semibold text-lg">{ev.title}</h3>
            <p className="text-gray-600">{ev.date}</p>
            <p className="text-gray-700 mt-1">{ev.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
