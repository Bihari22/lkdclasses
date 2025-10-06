"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Album Data
const albums = [
  {
    title: "Annual Day 2023",
    cover: "founder.png",
    images: ["founder.png", "album1-2.jpg", "album1-3.jpg"],
  },
  {
    title: "Science Fair 2023",
    cover: "album2.jpg",
    images: ["album2-1.jpg", "album2-2.jpg", "album2-3.jpg"],
  },
  {
    title: "Sports Meet 2023",
    cover: "album3.jpg",
    images: ["album3-1.jpg", "album3-2.jpg", "album3-3.jpg"],
  },
  {
    title: "Top Rankers 2023",
    cover: "album4.jpg",
    images: ["album4-1.jpg", "album4-2.jpg", "album4-3.jpg"],
  },
];

export default function GalleryPage() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  // GSAP fade-in
  useEffect(() => {
    if (!galleryRef.current) return;
    gsap.fromTo(
      galleryRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  // Auto-slide every 2 seconds
  useEffect(() => {
    if (selectedAlbum === null) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % albums[selectedAlbum].images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [selectedAlbum]);

  if (!albums) return null;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-28 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Gallery</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
          Memories captured in events, activities, and celebrations at <b>LKD Classes</b>
        </p>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white rounded-t-[50%]" />
      </section>

      {/* Albums Grid */}
      <section ref={galleryRef} className="pb-20 px-6 md:px-12 bg-white -mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {albums.map((album, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition cursor-pointer"
              onClick={() => { setSelectedAlbum(index); setSlideIndex(0); }}
            >
              <Image
                src={`/images/${album.cover}`}
                alt={album.title}
                width={400}
                height={300}
                className="object-cover w-full h-48 md:h-56"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 text-white text-sm p-2 text-center font-semibold">
                {album.title}
              </div>
            </div>
          ))}
        </div>
      </section>

{/* Modal Slideshow */}
{selectedAlbum !== null && (
  <div
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{ backdropFilter: "blur(8px)" }}
    onClick={() => setSelectedAlbum(null)}
  >
    <div
      className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Thumbnail Carousel / Slide Selector */}
      <div className="flex justify-center gap-2 overflow-x-auto py-2 bg-gray-100">
        {albums[selectedAlbum].images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSlideIndex(idx)}
            className={`cursor-pointer rounded-md border-2 ${
              idx === slideIndex ? "border-yellow-400" : "border-transparent"
            }`}
          >
            <Image
              src={`/images/${img}`}
              alt={`Thumbnail ${idx + 1}`}
              width={80}
              height={60}
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative">
        <Image
          src={`/images/${albums[selectedAlbum].images[slideIndex]}`}
          alt={`Slide ${slideIndex + 1}`}
          width={800}
          height={600}
          className="object-contain w-full max-h-[70vh]"
        />

        {/* Close Button */}
        <button
          onClick={() => setSelectedAlbum(null)}
          className="absolute top-2 right-2 text-gray-700 text-3xl font-bold hover:text-yellow-400"
        >
          &times;
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={() => setSlideIndex((slideIndex - 1 + albums[selectedAlbum].images.length) % albums[selectedAlbum].images.length)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700 text-4xl font-bold hover:text-yellow-400"
        >
          &#8249;
        </button>
        <button
          onClick={() => setSlideIndex((slideIndex + 1) % albums[selectedAlbum].images.length)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 text-4xl font-bold hover:text-yellow-400"
        >
          &#8250;
        </button>

        {/* Slide Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {albums[selectedAlbum].images.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === slideIndex ? "bg-yellow-400" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)}


      <Footer />
    </>
  );
}
