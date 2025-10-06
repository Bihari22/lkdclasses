"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    grade: "6 to 8",
    icon: "📚",
    subjects: ["Hindi", "English", "Math", "Science"],
    description: "Comprehensive foundation for middle school students.",
    benefits: [
      "Theory and practical lessons in all subjects",
      "Weekly practice papers & assignments",
      "Monthly tests & performance review",
      "Doubt-solving sessions & one-on-one guidance",
      "Exam preparation strategies",
      "Study materials, notes & reference papers",
    ],
  },
  {
    grade: "9 to 10",
    icon: "🧮",
    subjects: ["Math", "Science"],
    description: "Focused curriculum to excel in board exams.",
    benefits: [
      "Advanced concepts & problem solving",
      "Weekly mock tests & practice sheets",
      "Monthly evaluation & feedback",
      "One-on-one doubt clearing",
      "Exam strategy planning",
      "Study materials & reference notes",
    ],
  },
  {
    grade: "11 to 12",
    icon: "🔬",
    subjects: ["Physics", "Chemistry", "Math"],
    description: "Detailed preparation for board exams & competitive exams.",
    benefits: [
      "In-depth theory & practicals",
      "Regular assignments & practice sheets",
      "Monthly tests & performance analysis",
      "Personalized guidance sessions",
      "Exam strategies & tips",
      "Comprehensive study materials",
    ],
  },
];

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const benefitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCourse && benefitRef.current) {
      gsap.fromTo(
        benefitRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [selectedCourse]);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-28 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Our Courses</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
          Choose your class and explore the complete yearly curriculum & benefits.
        </p>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white rounded-t-[50%]" />
      </section>

      {/* Courses Cards */}
      {selectedCourse === null && (
        <section className="py-10  bg-indigo-50 px-6 md:px-12 -mt-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 transition transform hover:scale-105 flex flex-col items-center justify-center"
              >
                {/* Circle Icon */}
                <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center text-4xl md:text-5xl mb-4 shadow">
                  {course.icon}
                </div>
                <h3 className="text-2xl font-bold text-indigo-600 mb-2">{course.grade}</h3>
                <p className="text-gray-700 text-center mb-2">{course.description}</p>
                <p className="text-gray-500 text-sm mb-4 font-medium">
                  Subjects: {course.subjects.join(", ")}
                </p>
                <button
                  className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
                  onClick={() => setSelectedCourse(course)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Selected Course Detail */}
      {selectedCourse && (
        <section className="pb-16 bg-white px-6 md:px-12 -mt-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-2xl relative text-center">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-2xl"
              onClick={() => setSelectedCourse(null)}
            >
              ×
            </button>

            {/* Circular Icon */}
            <div className="bg-indigo-100 rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-6xl md:text-7xl mb-6 shadow-lg mx-auto">
              {selectedCourse.icon}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4">
              {selectedCourse.grade} - Course Details
            </h2>
            <p className="text-gray-800 mb-6">{selectedCourse.description}</p>

            {/* Yearly Highlights / Benefits */}
            <div ref={benefitRef} className="text-left max-w-xl mx-auto mb-6">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">What you'll get this year:</h3>
              <ul className="list-none space-y-3">
                {selectedCourse.benefits.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-3 text-2xl">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/register"
              className="bg-yellow-400 text-indigo-900 px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition inline-block"
            >
              Register Now
            </a>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
