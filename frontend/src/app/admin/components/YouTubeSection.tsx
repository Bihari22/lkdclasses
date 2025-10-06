"use client";

import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

type Video = {
  id: number;
  title: string;
  url: string;
  classes: string[];
  createdAt: string;
};

const availableClasses = ["6", "7", "8", "9", "10", "11", "12, All Classes"];

export default function YouTubeSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newURL, setNewURL] = useState("");
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

  const addVideo = () => {
    if (!newTitle || !newURL || selectedClasses.length === 0) return;

    const newVideo: Video = {
      id: Date.now(),
      title: newTitle,
      url: newURL,
      classes: selectedClasses,
      createdAt: new Date().toLocaleDateString(),
    };

    setVideos([newVideo, ...videos]);
    setNewTitle("");
    setNewURL("");
    setSelectedClasses([]);
  };

  const deleteVideo = (id: number) =>
    setVideos(videos.filter(v => v.id !== id));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Manage YouTube Videos</h2>

      {/* Add Video */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Add New Video</h3>

        <input
          type="text"
          placeholder="Video Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2 focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="YouTube URL"
          value={newURL}
          onChange={e => setNewURL(e.target.value)}
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
          onClick={addVideo}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Video
        </button>
      </div>

      {/* Existing Videos */}
      <div className="grid gap-4">
        {videos.map(v => (
          <div
            key={v.id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex-1 mb-2 md:mb-0">
              <h4 className="font-semibold text-gray-800 mb-1">{v.title}</h4>
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                Watch Video
              </a>
              <p className="text-sm text-gray-400 mt-1">
                Classes: {v.classes.join(", ")} | Added: {v.createdAt}
              </p>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                onClick={() => deleteVideo(v.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete Video"
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
