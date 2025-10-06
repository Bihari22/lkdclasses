"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsCard from "../components/StatsCard";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const rankersRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const enrollRef = useRef<HTMLDivElement>(null);

  const topRankers = [
    { name: "Rahul Kumar", photo: "/images/ranker1.png", achievement: "Topper 2024 - Science" },
    { name: "Anjali Singh", photo: "/images/ranker2.png", achievement: "Topper 2024 - Math" },
    { name: "Riya Sharma", photo: "/images/ranker3.png", achievement: "Topper 2024 - English" },
    { name: "Ram Sharma", photo: "/images/ranker3.png", achievement: "Topper 2025 - English" },
  ];

  const stats = [
    { number: "500+", label: "Students" },
    { number: "50+", label: "Alumni" },
    { number: "200+", label: "Passouts" },
    { number: "20+", label: "Top Rankers" },
  ];

  const courses = [
    { className: "6th–8th", details: "Monthly tests, Talent exams, 1 yearly exam, Counsellor support" },
    { className: "9th–10th", details: "Structured coaching, Timely assessments, Stress management" },
    { className: "11th–12th Science/Arts", details: "Subject-wise guidance, Competitions, Counsellor support" },
  ];

  useEffect(() => {
    if (heroRef.current) {
      const hero = heroRef.current;
      gsap.fromTo(hero.querySelector("h1"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5 });
      gsap.fromTo(hero.querySelector("p"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5, delay: 0.5 });
      gsap.fromTo(hero.querySelector("a"), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 1.2, delay: 1 });
      gsap.to(hero.querySelector("a"), { y: "+=5", duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
    }

    const sections = [
      { ref: aboutRef, y: 50 },
      { ref: founderRef, y: 50 },
      { ref: rankersRef, y: 30 },
      { ref: statsRef, y: 20 },
      { ref: coursesRef, y: 30 },
      { ref: galleryRef, y: 30 },
      { ref: testimonialRef, y: 20 },
      { ref: enrollRef, y: 30 },
    ];

    sections.forEach(({ ref, y }) => {
      if (ref.current) {
        gsap.from(ref.current, {
          scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play reverse play reverse" },
          opacity: 0,
          y: y,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    });
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-blue-400 text-white text-center overflow-hidden px-4 md:px-6"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight relative">
          Achieve Excellence with <br />
          <span className="text-yellow-300 relative inline-block">
            LKD Classes
            <span className="absolute left-0 -bottom-2 w-full h-1 bg-yellow-400 rounded-full opacity-50 animate-pulse"></span>
          </span>
        </h1>
        <p className="text-lg md:text-2xl max-w-3xl mb-6">
          Empowering students with Science, Math, English & more. Structured coaching for 6th–12th grades.
        </p>
        <a
          href="/register"
          className="bg-yellow-400 text-indigo-900 px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition transform"
        >
          Enroll Now
        </a>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-indigo-50 to-blue-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About LKD Classes</h2>
        <p className="max-w-3xl mx-auto text-gray-700 text-base md:text-lg">
          Located in Sitalpur, Saran, LKD Classes provides coaching for students from 6th to 12th with focus on excellence, confidence, and stress-free learning. Explore our courses and join the journey to success.
        </p>
      </section>

      {/* Founder Section */}
      <section ref={founderRef} className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-indigo-50 to-blue-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Message from the Founder</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-6xl mx-auto">
          <img src="/images/founder.png" alt="Founder Laliteshwar Kumar" className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-2xl" />
          <div className="max-w-xl text-left">
            <p className="text-gray-700 text-base md:text-lg italic">
              "Education is not just about marks — it’s about building confidence, discipline, and the right mindset for success. At LKD Classes, our mission is to inspire young minds and prepare them for the challenges of tomorrow."
            </p>
            <p className="mt-4 md:mt-6 font-semibold text-indigo-900">— Laliteshwar Kumar, Founder</p>
          </div>
        </div>
      </section>

     {/* Top Rankers */}
<section ref={rankersRef} className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-indigo-50 to-blue-50 text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Top Rankers</h2>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
    {topRankers.map((ranker, i) => (
      <div key={i} className="p-4 md:p-6 rounded-xl transform hover:scale-105 transition">
        <img
          src={ranker.photo}
          alt={ranker.name}
          className="w-24 h-24 md:w-40 md:h-40 object-cover mx-auto rounded-full shadow-lg mb-2 md:mb-4"
        />
        <h3 className="text-sm md:text-xl font-bold text-indigo-600">{ranker.name}</h3>
        <p className="text-gray-700 mt-1 md:mt-2 text-xs md:text-base">{ranker.achievement}</p>
      </div>
    ))}
  </div>
</section>

{/* Achievements / Stats */}
<section ref={statsRef} className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-indigo-50 to-blue-50 text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Achievements</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
    {stats.map((stat, i) => (
      <StatsCard key={i} number={stat.number} label={stat.label} />
    ))}
  </div>
</section>


      {/* Courses Overview */}
      <section ref={coursesRef} className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-indigo-50 to-blue-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Courses</h2>
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {courses.map((course, i) => (
            <div key={i} className="p-4 md:p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg md:text-xl font-bold text-indigo-600 mb-1 md:mb-2">{course.className}</h3>
              <p className="text-gray-700 text-sm md:text-base">{course.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section ref={galleryRef} className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-indigo-50 to-blue-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Gallery & Events</h2>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          <img src="/images/event1.png" alt="Event" className="rounded-xl shadow" />
          <img src="/images/event2.png" alt="Event" className="rounded-xl shadow" />
          <img src="/images/event3.png" alt="Event" className="rounded-xl shadow" />
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialRef} className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-indigo-50 to-blue-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          <div className="p-4 md:p-6 border rounded-xl shadow">
            <p className="text-gray-700 italic text-sm md:text-base">"Great coaching, improved confidence and results!"</p>
            <p className="mt-2 md:mt-4 font-semibold text-indigo-900 text-sm md:text-base">— Student A</p>
          </div>
          <div className="p-4 md:p-6 border rounded-xl shadow">
            <p className="text-gray-700 italic text-sm md:text-base">"Amazing guidance and support from teachers."</p>
            <p className="mt-2 md:mt-4 font-semibold text-indigo-900 text-sm md:text-base">— Student B</p>
          </div>
          <div className="p-4 md:p-6 border rounded-xl shadow">
            <p className="text-gray-700 italic text-sm md:text-base">"Structured classes and great environment."</p>
            <p className="mt-2 md:mt-4 font-semibold text-indigo-900 text-sm md:text-base">— Parent C</p>
          </div>
        </div>
      </section>

      {/* Enroll / Registration CTA */}
      <section ref={enrollRef} className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-r from-indigo-500 to-blue-400 text-white text-center mb-0">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join LKD Classes Today</h2>
        <p className="max-w-3xl mx-auto mb-6 text-sm md:text-base">Register now and start your journey towards excellence.</p>
        <a href="/register" className="bg-yellow-400 text-indigo-900 px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition transform">
          Enroll Now
        </a>
      </section>

      <Footer />
    </>
  );
}
