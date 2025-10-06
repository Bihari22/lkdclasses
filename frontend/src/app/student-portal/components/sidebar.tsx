"use client";

import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineDocumentReport,
  HiOutlineCreditCard,
  HiOutlineBell,
  HiOutlineVideoCamera,
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
} from "react-icons/hi";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const menuItems = [
    { key: "profile", label: "Profile", icon: <HiOutlineUser /> },
    { key: "results", label: "Results", icon: <HiOutlineDocumentReport /> },
    { key: "certificates", label: "Certificates", icon: <HiOutlineBadgeCheck /> },
    { key: "payments", label: "Payments", icon: <HiOutlineCreditCard /> },
    { key: "notifications", label: "Notifications", icon: <HiOutlineBell /> },
    { key: "events", label: "Events", icon: <HiOutlineAcademicCap /> },
    { key: "youtube", label: "YouTube", icon: <HiOutlineVideoCamera /> },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col w-64 bg-white border-r h-screen shadow-xl fixed left-0 top-0 z-50"
    >
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-extrabold text-indigo-600 tracking-wide">LKD Portal</h1>
        <p className="text-sm text-gray-500 mt-1">Student Dashboard</p>
      </div>

      <nav className="flex-1 flex flex-col space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`flex items-center gap-3 px-6 py-3 text-left text-sm font-medium rounded-lg transition-all duration-200
              ${activeSection === item.key
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t mx-6 mt-4 pt-4 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} LKD Classes
      </div>
    </motion.aside>
  );
}
