"use client";

import { useState } from "react";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";

interface Certificate {
  name: string;
  event: string;
  date: string;
  file: string; // PDF or image path
}

const certificates: Certificate[] = [
  {
    name: "Excellence in Science",
    event: "Science Quiz 2025",
    date: "2025-03-12",
    file: "/certificates/science_quiz_2025.pdf",
  },
  {
    name: "Top Performer",
    event: "Monthly Test - September",
    date: "2025-09-15",
    file: "/certificates/monthly_test_sept.pdf",
  },
  {
    name: "Annual Day Participation",
    event: "Annual Day 2025",
    date: "2025-01-10",
    file: "/certificates/annual_day_2025.pdf",
  },
];

export default function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-700">Certificates</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {certificates.map((cert, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center"
          >
            {/* Certificate Image/Placeholder */}
            <div className="w-full h-48 bg-gray-100 rounded-lg relative flex items-center justify-center">
              <Image
                src="/images/certificate-placeholder.png"
                alt={cert.name}
                fill
                className="object-contain p-4"
              />
            </div>

            <h3 className="text-indigo-600 font-semibold mt-3 text-center">{cert.name}</h3>
            <p className="text-gray-500 text-sm">{cert.event}</p>
            <p className="text-gray-400 text-xs">{cert.date}</p>

            <div className="flex gap-3 mt-3">
             
              <a
                href={cert.file}
                download
                className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100"
              >
                <FaDownload /> Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              {selectedCertificate.name}
            </h3>
            <p className="text-gray-500 mb-2">{selectedCertificate.event}</p>
            <p className="text-gray-400 mb-4">{selectedCertificate.date}</p>

            <iframe
              src={selectedCertificate.file}
              className="w-full h-[70vh] border rounded-lg"
              title={selectedCertificate.name}
            />
          </div>
        </div>
      )}
    </div>
  );
}
