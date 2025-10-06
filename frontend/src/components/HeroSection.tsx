"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline();
      tl.from(heroRef.current.querySelector("h1"), {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });
      tl.from(
        heroRef.current.querySelector("p"),
        { opacity: 0, y: 20, duration: 1, ease: "power3.out" },
        "-=0.5"
      );
      tl.from(
        heroRef.current.querySelector("a"),
        { opacity: 0, y: 10, duration: 1, ease: "power3.out" },
        "-=0.5"
      );
    }
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-center px-6 overflow-hidden">
      
      {/* Floating background shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-yellow-400 opacity-20 animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-pink-400 opacity-15 animate-ping"></div>

      <div ref={heroRef} className="relative z-10">
        {/* Headline with animated underline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg relative">
          Welcome to{" "}
          <span className="text-yellow-300 relative inline-block">
            LKD Classes
            <span className="absolute left-0 -bottom-2 w-full h-1 bg-yellow-400 rounded-full opacity-50 animate-pulse"></span>
          </span>
        </h1>

        {/* Subtitle / paragraph */}
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Admin can customize everything. Empowering students with Science, Math,
          English & more.
        </p>

        {/* Call-to-action button */}
      <a
  href="/courses"
  className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition transform animate-bounce-slow"
>
  Explore Courses
</a>
      </div>
    </section>
  );
}
