"use client";

import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  classes: string[];
  createdAt: string;
};

const availableClasses = ["6", "7", "8", "9", "10", "11", "12", "All Classes"];

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const toggleClass = (cls: string) => {
    if (cls === "All Classes") {
      setSelectedClasses(["All Classes"]);
      return;
    }
    if (selectedClasses.includes(cls)) {
      setSelectedClasses(selectedClasses.filter(c => c !== cls));
    } else {
      setSelectedClasses([...selectedClasses.filter(c => c !== "All Classes"), cls]);
    }
  };

  const addEvent = () => {
    if (!newTitle || !newDate || !newDesc || selectedClasses.length === 0) return;

    const newEvent: Event = {
      id: Date.now(),
      title: newTitle,
      date: newDate,
      description: newDesc,
      classes: selectedClasses,
      createdAt: new Date().toLocaleDateString(),
    };

    setEvents([newEvent, ...events]);
    setNewTitle("");
    setNewDate("");
    setNewDesc("");
    setSelectedClasses([]);
  };

  const deleteEvent = (id: number) =>
    setEvents(events.filter(e => e.id !== id));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Manage Events</h2>

      {/* Add Event */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Add New Event</h3>

        <input
          type="text"
          placeholder="Event Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2 focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          value={newDate}
          onChange={e => setNewDate(e.target.value)}
          className="border p-2 rounded w-full mb-2 focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          placeholder="Description"
          value={newDesc}
          onChange={e => setNewDesc(e.target.value)}
          className="border p-2 rounded w-full mb-2 focus:ring-2 focus:ring-indigo-500"
        />

        {/* Class Selection */}
        <div className="flex flex-wrap gap-2 mb-2">
          {availableClasses.map(cls => (
            <button
              key={cls}
              onClick={() => toggleClass(cls)}
              className={`px-3 py-1 rounded-full border transition ${
                selectedClasses.includes(cls)
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-100"
              }`}
            >
              {cls}
            </button>
          ))}
        </div>

        <button
          onClick={addEvent}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Event
        </button>
      </div>

      {/* Existing Events */}
      <div className="grid gap-4">
        {events.map(e => (
          <div
            key={e.id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex-1 mb-2 md:mb-0">
              <h4 className="font-semibold text-gray-800 mb-1">{e.title}</h4>
              <p className="text-gray-700 mb-1">{e.description}</p>
              <p className="text-sm text-gray-400">
                Date: {e.date} | Classes: {e.classes.join(", ")} | Added: {e.createdAt}
              </p>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                onClick={() => deleteEvent(e.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete Event"
              >
                <HiOutlineTrash size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
