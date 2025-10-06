"use client";

const notifications = [
  { title: "Exam Schedule Released", date: "10 Jan", desc: "Check your class exam schedule." },
  { title: "New YouTube Playlist", date: "12 Jan", desc: "Updated playlist for class 6 to 8." },
  { title: "Fee Reminder", date: "15 Jan", desc: "February fee due soon." },
];

export default function NotificationsSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((note, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow p-4 hover:shadow-xl transition">
            <h3 className="font-semibold text-lg">{note.title}</h3>
            <p className="text-gray-600">{note.date}</p>
            <p className="text-gray-700 mt-1">{note.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
