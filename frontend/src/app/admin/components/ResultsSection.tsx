"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaUpload, FaDownload, FaTrash, FaEdit } from "react-icons/fa";
import * as XLSX from "xlsx";

interface Result {
  id: number;
  name: string;
  className: string;
  subject: string;
  marks: number;
  total: number;
  grade: string;
}

export default function ResultsSection() {
  const [results, setResults] = useState<Result[]>([]);
  const [filter, setFilter] = useState("All");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [editing, setEditing] = useState<Result | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("adminResults");
    if (saved) setResults(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("adminResults", JSON.stringify(results));
  }, [results]);

  const classes = Array.from(new Set(results.map(r => r.className)));

  const filteredResults = selectedClass
    ? results.filter(r => r.className === selectedClass)
    : results;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    const newResults = rows.map((r, i) => ({
      id: Date.now() + i,
      name: r.Name || "Unknown",
      className: r.Class || "N/A",
      subject: r.Subject || "N/A",
      marks: parseFloat(r.Marks) || 0,
      total: parseFloat(r.Total) || 100,
      grade: r.Grade || "-",
    }));

    setResults([...results, ...newResults]);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, "results.xlsx");
  };

  const deleteResult = (id: number) => {
    setResults(results.filter(r => r.id !== id));
  };

  const updateResult = () => {
    if (!editing) return;
    setResults(results.map(r => (r.id === editing.id ? editing : r)));
    setEditing(null);
  };

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        🧾 Results Management
      </h2>

      {/* Upload + Export + Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <label className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
          <FaUpload /> Upload Excel/CSV
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
        <button
          onClick={exportToExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaDownload /> Export to Excel
        </button>
        <select
          className="border rounded-lg p-2 bg-white shadow-sm"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="All">All Classes</option>
          {classes.map(cls => (
            <option key={cls}>{cls}</option>
          ))}
        </select>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {classes
          .filter(cls => filter === "All" || filter === cls)
          .map(cls => {
            const count = results.filter(r => r.className === cls).length;
            return (
              <motion.div
                key={cls}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-4 rounded-xl shadow-md cursor-pointer flex justify-between items-center"
                onClick={() => setSelectedClass(cls)}
              >
                <div>
                  <p className="text-lg font-semibold">{cls}</p>
                  <p className="text-sm text-gray-500">{count} Papers</p>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedClass(null);
                  }}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </motion.div>
            );
          })}
      </div>

      {/* Results Table Modal / Slide-in */}
      {selectedClass && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-start pt-16 md:pt-10 bg-black bg-opacity-40 overflow-y-auto"
          onClick={() => setSelectedClass(null)}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-4 w-11/12 md:w-3/4 lg:w-2/3 relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-700">
                {selectedClass} - Results
              </h3>
              <button
                onClick={() => setSelectedClass(null)}
                className="text-gray-500 hover:text-black"
              >
                <FaTimes />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Subject</th>
                    <th className="p-2 text-left">Marks</th>
                    <th className="p-2 text-left">Total</th>
                    <th className="p-2 text-left">Grade</th>
                    <th className="p-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map(r => (
                    <tr
                      key={r.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-2">{r.name}</td>
                      <td className="p-2">{r.subject}</td>
                      <td className="p-2">{r.marks}</td>
                      <td className="p-2">{r.total}</td>
                      <td className="p-2">{r.grade}</td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => setEditing(r)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteResult(r.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredResults.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-gray-500">
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Result Modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40"
          onClick={() => setEditing(null)}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 w-11/12 md:w-1/2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">Edit Result</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={editing.name}
                onChange={e => setEditing({ ...editing, name: e.target.value })}
                className="border rounded-lg p-2"
                placeholder="Name"
              />
              <input
                type="text"
                value={editing.className}
                onChange={e => setEditing({ ...editing, className: e.target.value })}
                className="border rounded-lg p-2"
                placeholder="Class"
              />
              <input
                type="text"
                value={editing.subject}
                onChange={e => setEditing({ ...editing, subject: e.target.value })}
                className="border rounded-lg p-2"
                placeholder="Subject"
              />
              <input
                type="number"
                value={editing.marks}
                onChange={e =>
                  setEditing({ ...editing, marks: parseFloat(e.target.value) })
                }
                className="border rounded-lg p-2"
                placeholder="Marks"
              />
              <input
                type="number"
                value={editing.total}
                onChange={e =>
                  setEditing({ ...editing, total: parseFloat(e.target.value) })
                }
                className="border rounded-lg p-2"
                placeholder="Total"
              />
              <input
                type="text"
                value={editing.grade}
                onChange={e => setEditing({ ...editing, grade: e.target.value })}
                className="border rounded-lg p-2"
                placeholder="Grade"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={updateResult}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
