"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const [user, setUser] = useState<any>(null); // ✅ login state
  const menuRef = useRef<HTMLDivElement>(null);
  const enrollRef = useRef<HTMLAnchorElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // ✅ Check login on load (can modify for JWT or cookie)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enroll button visibility
  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => {
        const heroHeight = window.innerHeight * 0.8;
        setShowEnroll(window.scrollY > heroHeight);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setShowEnroll(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (showEnroll && enrollRef.current) {
      gsap.fromTo(
        enrollRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [showEnroll]);

  // ✅ handle Student Portal click
  const handlePortalClick = () => {
    if (user) {
      router.push("/student-portal");
    } else {
      router.push("/login");
    }
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Founder", href: "/founder" },
    { name: "Top Rankers", href: "/top-rankers" },
    { name: "Courses", href: "/courses" },
    { name: "Gallery", href: "/gallery" },
  ];

  if (pathname.startsWith("/admin") || pathname.startsWith("/student-portal")) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md transition-all">
      <div
        className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center"
        ref={menuRef}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="LKD Classes" width={50} height={50} />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* ✅ Student Portal Button */}
          <button
            onClick={handlePortalClick}
            className="text-gray-700 font-medium hover:text-indigo-600 transition cursor-pointer"
          >
            Student Portal
          </button>

          {showEnroll && (
            <Link
              ref={enrollRef}
              href="/register"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
            >
              Enroll Now
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-md px-6 py-4 flex flex-col space-y-4 fixed w-full top-[64px] left-0 z-40"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium hover:text-indigo-600 transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* ✅ Student Portal mobile */}
            <button
              onClick={() => {
                setIsOpen(false);
                handlePortalClick();
              }}
              className="text-gray-700 font-medium hover:text-indigo-600 transition text-left"
            >
              Student Portal
            </button>

            {showEnroll && (
              <Link
                href="/register"
                className="bg-indigo-600 text-white text-center px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
                onClick={() => setIsOpen(false)}
              >
                Enroll Now
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
