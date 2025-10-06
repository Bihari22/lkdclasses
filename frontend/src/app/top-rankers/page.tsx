"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const top3 = [
  { name: "Aarav Singh", img: "top1.jpg", achievement: "100% in Board Exams" },
  { name: "Meera Kumari", img: "top2.jpg", achievement: "Rank 2 in State Math Olympiad" },
  { name: "Rohan Verma", img: "top3.jpg", achievement: "Top Scorer in Science Quiz" },
];

const otherAchievers = [
  { name: "Anjali Sharma", achievement: "95% in Board Exams", img: "achiever1.jpg" },
  { name: "Vikram Patel", achievement: "State Chess Champion", img: "achiever2.jpg" },
  { name: "Priya Mishra", achievement: "Top Rank in Coding Contest", img: "achiever3.jpg" },
  { name: "Siddharth Yadav", achievement: "Excellent Performance in Physics", img: "achiever4.jpg" },
  { name: "Neha Singh", achievement: "Best in Art & Creativity", img: "achiever5.jpg" },
  { name: "Rahul Kumar", achievement: "High Score in Olympiad", img: "achiever6.jpg" },
  { name: "Simran Kaur", achievement: "Top in English Debate", img: "achiever7.jpg" },
  { name: "Aditya Singh", achievement: "Winner in Science Fair", img: "achiever8.jpg" },
];

export default function TopRankersPage() {
  const top3Ref = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateSection = (element: HTMLDivElement | null) => {
      if (!element) return;
      gsap.fromTo(
        element.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
          },
        }
      );
    };

    animateSection(top3Ref.current);
    animateSection(otherRef.current);
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
     <section className="relative py-28 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Our Top Achievers
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
          Recognizing dedication, hard work, and outstanding results.
        </p>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white rounded-t-[50%]" />
      </section>


      {/* Top 3 Podium */}
      <section ref={top3Ref} className="pb-20 -mt-12 bg-white px-6 md:px-12">
        <div className="relative max-w-7xl mx-auto flex justify-center items-end gap-6 md:gap-12">
          
          {/* 2nd Place */}
          <div className="flex flex-col items-center transform -translate-y-4 md:-translate-y-6 hover:scale-105 transition w-24 md:w-auto">
            <Image
              src={`/images/${top3[1].img}`}
              alt={top3[1].name}
              width={100}
              height={100}
              className="rounded-full shadow-xl border-4 border-gray-200 md:w-36 md:h-36 w-24 h-24"
            />
            <div className="mt-1 bg-gray-200 rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-gray-700 text-base md:text-lg font-bold shadow">
              🥈
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-indigo-500 mt-2 md:mt-4 text-center">{top3[1].name}</h3>
            <p className="text-gray-600 mt-1 text-center text-xs md:text-sm">{top3[1].achievement}</p>
            <div className="mt-2 h-8 md:h-16 w-12 md:w-24 bg-gray-200 rounded-t-lg"></div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center transform hover:scale-105 transition w-28 md:w-auto">
            <Image
              src={`/images/${top3[0].img}`}
              alt={top3[0].name}
              width={140}
              height={140}
              className="rounded-full shadow-2xl border-4 border-yellow-400 md:w-48 md:h-48 w-32 h-32"
            />
            <div className="mt-1 bg-yellow-400 rounded-full w-10 h-10 md:w-16 md:h-16 flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-lg">
              🏆
            </div>
            <h3 className="text-base md:text-2xl font-bold text-indigo-600 mt-2 md:mt-4 text-center">{top3[0].name}</h3>
            <p className="text-gray-700 mt-1 text-center text-xs md:text-sm">{top3[0].achievement}</p>
            <div className="mt-2 h-12 md:h-24 w-16 md:w-32 bg-yellow-400 rounded-t-lg"></div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center transform translate-y-0 md:-translate-y-10 hover:scale-105 transition w-24 md:w-auto">
            <Image
              src={`/images/${top3[2].img}`}
              alt={top3[2].name}
              width={100}
              height={100}
              className="rounded-full shadow-xl border-4 border-gray-200 md:w-36 md:h-36 w-24 h-24"
            />
            <div className="mt-1 bg-yellow-200 rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-gray-700 text-base md:text-lg font-bold shadow">
              🥉
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-indigo-500 mt-2 md:mt-4 text-center">{top3[2].name}</h3>
            <p className="text-gray-600 mt-1 text-center text-xs md:text-sm">{top3[2].achievement}</p>
            <div className="mt-2 h-6 md:h-16 w-12 md:w-24 bg-yellow-200 rounded-t-lg"></div>
          </div>
        </div>
      </section>

      {/* Other Achievers */}
      <section ref={otherRef} className="py-20 bg-indigo-50 px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-10">Other Achievers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {otherAchievers.map((achiever, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-2xl shadow hover:shadow-xl transition transform hover:scale-105 flex flex-col items-center"
            >
              <Image
                src={`/images/${achiever.img}`}
                alt={achiever.name}
                width={120}
                height={120}
                className="rounded-full object-cover w-24 h-24 md:w-28 md:h-28 mb-2"
              />
              <h3 className="text-sm md:text-base font-semibold text-indigo-600">{achiever.name}</h3>
              <p className="text-gray-700 text-xs md:text-sm mt-1">{achiever.achievement}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
