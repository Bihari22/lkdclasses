"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaSearch } from "react-icons/fa";

interface Student {
  id: number;
  rollNo: string; // fetched from backend
  name: string;
  className: string;
  phone: string;
  email: string;
  status: string;
}

export default function StudentsSection() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    className: "",
    phone: "",
    email: "",
    status: "Active",
  });

  // Load from localStorage (simulate backend)
  useEffect(() => {
    const saved = localStorage.getItem("adminStudents");
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("adminStudents", JSON.stringify(students));
  }, [students]);

  // Simulate backend roll number generation
  const generateRollNo = () => `R${Math.floor(1000 + Math.random() * 9000)}`;

  const addStudent = () => {
    if (!form.name.trim() || !form.className.trim()) return alert("Name and class required!");
    if (!/^\d{10}$/.test(form.phone)) return alert("Phone must be 10 digits!");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return alert("Invalid email!");
    if (!/^(6|7|8|9|1[0-2])$/.test(form.className)) return alert("Class must be between 6 to 12!");
    
    const newStudent: Student = {
      id: Date.now(),
      rollNo: generateRollNo(), // fetch from backend
      ...form,
    };
    setStudents([...students, newStudent]);
    setForm({ name: "", className: "", phone: "", email: "", status: "Active" });
  };

  const deleteStudent = (id: number) => setStudents(students.filter((s) => s.id !== id));

  const startEdit = (student: Student) => {
    setEditingId(student.id);
    setForm({ ...student });
  };

  const saveEdit = () => {
    setStudents(students.map((s) => (s.id === editingId ? { ...s, ...form } : s)));
    setEditingId(null);
    setForm({ name: "", className: "", phone: "", email: "", status: "Active" });
  };

  // Get all classes for cards
  const classes = Array.from(new Set(students.map((s) => s.className))).sort();

  // Filtered students for selected class
  const displayedStudents = selectedClass
    ? students.filter((s) => s.className === selectedClass)
    : students.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.phone.includes(searchTerm) ||
          s.email.toLowerCase().includes(searchTerm)
      );

  return (
    <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">👩‍🎓 Students Management</h2>

      {/* Add/Edit Form */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg p-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Class (6-12)"
            className="border rounded-lg p-2"
            value={form.className}
            onChange={(e) => setForm({ ...form, className: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border rounded-lg p-2"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            className="border rounded-lg p-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          {editingId ? (
            <>
              <button
                onClick={saveEdit}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", className: "", phone: "", email: "", status: "Active" });
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addStudent}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaPlus /> Add Student
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, phone, email"
          className="border rounded-lg p-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {classes.map((cls) => (
          <div
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className="p-4 bg-indigo-100 rounded-lg shadow hover:shadow-lg cursor-pointer text-center font-semibold text-indigo-700"
          >
            Class {cls} <br />
            {students.filter((s) => s.className === cls).length} Students
          </div>
        ))}
      </div>

     {/* Students Table/Card List */}
{selectedClass && (
  <div className="mb-6 relative">
    {/* Cancel Icon */}
    <button
      onClick={() => setSelectedClass(null)}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
      title="Close"
    >
      ✕
    </button>

    <div className="overflow-x-auto bg-white rounded-lg shadow-md border mt-10">
      <table className="min-w-[600px] md:min-w-full w-full text-sm border-collapse">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-3 text-left">Roll No</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedStudents.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="p-2 md:p-3">{s.rollNo}</td>
              <td className="p-2 md:p-3">{s.name}</td>
              <td className="p-2 md:p-3">{s.phone}</td>
              <td className="p-2 md:p-3">{s.email}</td>
              <td className="p-2 md:p-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    s.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {s.status}
                </span>
              </td>
              <td className="p-2 md:p-3 text-center flex justify-center gap-2">
                <button
                  onClick={() => startEdit(s)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteStudent(s.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

    </motion.div>
  );
}
