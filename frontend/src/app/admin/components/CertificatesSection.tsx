"use client";

import { useState } from "react";
import { FaFileDownload, FaTrashAlt, FaPlusCircle } from "react-icons/fa";

interface Certificate {
  id: number;
  studentName: string;
  className: string;
  title: string;
  file: string; // Path to certificate PDF or image
}

const initialCertificates: Certificate[] = [
  { id: 1, studentName: "Aarav Singh", className: "6th", title: "Top Ranker - Math", file: "/certificates/cert1.pdf" },
  { id: 2, studentName: "Meera Kumari", className: "8th", title: "Science Fair Winner", file: "/certificates/cert2.pdf" },
  { id: 3, studentName: "Rohan Verma", className: "10th", title: "Best Performance", file: "/certificates/cert3.pdf" },
];

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [newCert, setNewCert] = useState({ studentName: "", className: "", title: "", file: "" });

  // Add new certificate
  const addCertificate = () => {
    if (!newCert.studentName || !newCert.className || !newCert.title || !newCert.file) {
      alert("Please fill all fields!");
      return;
    }
    const id = certificates.length + 1;
    setCertificates([...certificates, { id, ...newCert }]);
    setNewCert({ studentName: "", className: "", title: "", file: "" });
  };

  // Remove certificate
  const removeCertificate = (id: number) => {
    setCertificates(certificates.filter((c) => c.id !== id));
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Certificates Management</h2>

      {/* Add Certificate Form */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-indigo-600 mb-4">Add New Certificate</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Student Name"
            className="border p-2 rounded"
            value={newCert.studentName}
            onChange={(e) => setNewCert({ ...newCert, studentName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Class"
            className="border p-2 rounded"
            value={newCert.className}
            onChange={(e) => setNewCert({ ...newCert, className: e.target.value })}
          />
          <input
            type="text"
            placeholder="Certificate Title"
            className="border p-2 rounded"
            value={newCert.title}
            onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="File Path"
            className="border p-2 rounded"
            value={newCert.file}
            onChange={(e) => setNewCert({ ...newCert, file: e.target.value })}
          />
        </div>
        <button
          onClick={addCertificate}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
        >
          <FaPlusCircle /> Add Certificate
        </button>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 hover:shadow-lg transition">
            <h3 className="font-semibold text-indigo-600 text-lg">{cert.title}</h3>
            <p className="text-gray-600">{cert.studentName} - {cert.className}</p>
            <div className="flex gap-2 mt-2">
              <a
                href={cert.file}
                target="_blank"
                className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-600"
              >
                <FaFileDownload /> View/Download
              </a>
              <button
                onClick={() => removeCertificate(cert.id)}
                className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600"
              >
                <FaTrashAlt /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
