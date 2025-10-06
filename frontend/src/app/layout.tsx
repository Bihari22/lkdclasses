"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
const hideNavbar = pathname.startsWith("/student-portal") || pathname.startsWith("/admin");


  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* Navbar only if not student portal */}
        {!hideNavbar && <Navbar />}

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: "14px",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          }}
        />

        {/* Page transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
