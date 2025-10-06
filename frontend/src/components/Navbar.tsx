"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const enrollRef = useRef<HTMLAnchorElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Toggle menu
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enroll visibility control
  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => {
        const heroHeight = window.innerHeight * 0.8;
        if (window.scrollY > heroHeight) setShowEnroll(true);
        else setShowEnroll(false);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setShowEnroll(true);
    }
  }, [pathname]);

  // Enroll animation
  useEffect(() => {
    if (showEnroll && enrollRef.current) {
      gsap.fromTo(
        enrollRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [showEnroll]);

  // Home button smooth scroll or navigation
  const handleHomeClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsOpen(false);
    } else {
      router.push("/");
    }
  };

  // Section scroll within home
  const handleSmoothScroll = (href: string) => {
    if (pathname === "/" && href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
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
          {links.map((link) => {
            const isHome = link.href === "/";
            const isCurrentPage = pathname === link.href;

            return isHome ? (
              <button
                key={link.name}
                onClick={handleHomeClick}
                className="text-gray-700 font-medium hover:text-indigo-600 transition cursor-pointer"
              >
                {link.name}
              </button>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (isCurrentPage && link.href !== "#") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setIsOpen(false);
                  } else handleSmoothScroll(link.href);
                }}
                className="text-gray-700 font-medium hover:text-indigo-600 transition"
              >
                {link.name}
              </a>
            );
          })}

          <Link
            href="/student-portal"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Student Portal
          </Link>

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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
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
            {links.map((link, index) => {
              const isHome = link.href === "/";
              const isCurrentPage = pathname === link.href;

              return isHome ? (
                <motion.button
                  key={link.name}
                  onClick={handleHomeClick}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="text-gray-700 font-medium hover:text-indigo-600 transition text-left"
                >
                  {link.name}
                </motion.button>
              ) : (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (isCurrentPage && link.href !== "#") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else handleSmoothScroll(link.href);
                    setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="text-gray-700 font-medium hover:text-indigo-600 transition"
                >
                  {link.name}
                </motion.a>
              );
            })}

            <motion.a
              href="/student-portal"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * links.length }}
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              Student Portal
            </motion.a>

            <motion.a
              href="/register"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * (links.length + 1) }}
              className="bg-indigo-600 text-white text-center px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
            >
              Enroll Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
