"use client";

import { useState } from "react";
import { FaUsers, FaMoneyBillWave, FaRegCalendarAlt, FaAward, FaYoutube } from "react-icons/fa";

interface Props {
  setActiveSection: (section: string) => void;
}

const DashboardOverview: React.FC<Props> = ({ setActiveSection }) => {
  // Dummy data
  const [stats] = useState({
    students: 120,
    revenue: 55000,
    events: 5,
    certificates: 80,
    youtube: 12,
  });

  const cards = [
    { key: "students", label: "Total Students", value: stats.students, icon: <FaUsers className="text-indigo-600 w-10 h-10" /> },
    { key: "payments", label: "Total Revenue", value: `₹${stats.revenue}`, icon: <FaMoneyBillWave className="text-green-500 w-10 h-10" /> },
    { key: "events", label: "Upcoming Events", value: stats.events, icon: <FaRegCalendarAlt className="text-yellow-500 w-10 h-10" /> },
    { key: "certificates", label: "Certificates Issued", value: stats.certificates, icon: <FaAward className="text-purple-500 w-10 h-10" /> },
    { key: "youtube", label: "YouTube Playlists", value: stats.youtube, icon: <FaYoutube className="text-red-500 w-10 h-10" /> },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-6">Admin Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.key}
            className="flex items-center gap-4 p-4 sm:p-5 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition-all bg-white"
            onClick={() => setActiveSection(card.key)}
          >
            <div className="text-3xl">{card.icon}</div>
            <div className="flex flex-col">
              <p className="text-gray-500 text-sm sm:text-base">{card.label}</p>
              <p className="text-lg sm:text-xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
