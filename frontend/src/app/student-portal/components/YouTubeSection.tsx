"use client";

import { useState } from "react";
import { FaYoutube } from "react-icons/fa";

interface Playlist {
  className: string;
  title: string;
  url: string;
}

const playlists: Playlist[] = [
  { className: "6-8", title: "Math Class 6-8", url: "https://www.youtube.com/embed/VIDEO_ID1" },
  { className: "6-8", title: "Science Class 6-8", url: "https://www.youtube.com/embed/VIDEO_ID2" },
  { className: "9-10", title: "Math Class 9-10", url: "https://www.youtube.com/embed/VIDEO_ID3" },
  { className: "9-10", title: "Science Class 9-10", url: "https://www.youtube.com/embed/VIDEO_ID4" },
  { className: "11-12", title: "Physics Class 11-12", url: "https://www.youtube.com/embed/VIDEO_ID5" },
  { className: "11-12", title: "Chemistry Class 11-12", url: "https://www.youtube.com/embed/VIDEO_ID6" },
];

export default function YouTubeSection() {
  const [selectedClass, setSelectedClass] = useState("6-8");
  const [selectedVideo, setSelectedVideo] = useState(playlists[0].url);

  const filteredPlaylists = playlists.filter(p => p.className === selectedClass);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
        <FaYoutube className="text-red-600" /> YouTube Playlist
      </h2>

      {/* Class Filter */}
      <div className="flex gap-4 mb-4">
        {["6-8", "9-10", "11-12"].map(cls => (
          <button
            key={cls}
            onClick={() => {
              setSelectedClass(cls);
              setSelectedVideo(playlists.find(p => p.className === cls)?.url || "");
            }}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedClass === cls ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-700"
            }`}
          >
            Class {cls}
          </button>
        ))}
      </div>

      {/* Video Player */}
      <div className="w-full aspect-video mb-4 rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={selectedVideo}
          title="Class Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlaylists.map((p, i) => (
          <div
            key={i}
            onClick={() => setSelectedVideo(p.url)}
            className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition hover:shadow-lg ${
              selectedVideo === p.url ? "bg-indigo-100 border-l-4 border-indigo-600" : "bg-gray-50"
            }`}
          >
            <FaYoutube className="text-red-600 text-2xl" />
            <span className="font-semibold text-gray-700">{p.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
