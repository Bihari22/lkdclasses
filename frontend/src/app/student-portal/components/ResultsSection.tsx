"use client";

import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

interface SubjectResult {
  subject: string;
  obtained: number;
  total: number;
}

interface TestResult {
  testName: string;
  date: string;
  subjects: SubjectResult[];
}

const testResults: TestResult[] = [
  {
    testName: "Monthly Test - September",
    date: "2025-09-15",
    subjects: [
      { subject: "Math", obtained: 45, total: 50 },
      { subject: "Science", obtained: 40, total: 50 },
    ],
  },
  {
    testName: "Monthly Test - October",
    date: "2025-10-10",
    subjects: [
      { subject: "Math", obtained: 48, total: 50 },
      { subject: "Science", obtained: 42, total: 50 },
    ],
  },
  {
    testName: "Quarterly Exam",
    date: "2025-12-01",
    subjects: [
      { subject: "Math", obtained: 90, total: 100 },
      { subject: "Science", obtained: 85, total: 100 },
    ],
  },
];

export default function ResultsSection() {
  const [selectedTestIndex, setSelectedTestIndex] = useState<number>(0);
  const [sortAsc, setSortAsc] = useState(true);

  const selectedTest = testResults[selectedTestIndex];
  const sortedSubjects = [...selectedTest.subjects].sort((a, b) =>
    sortAsc ? a.obtained - b.obtained : b.obtained - a.obtained
  );

  const totalObtained = sortedSubjects.reduce((sum, s) => sum + s.obtained, 0);
  const totalMarks = sortedSubjects.reduce((sum, s) => sum + s.total, 0);
  const percentage = ((totalObtained / totalMarks) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h2 className="text-2xl font-bold text-indigo-700">Test Results</h2>
        <div className="flex items-center gap-3">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={selectedTestIndex}
            onChange={(e) => setSelectedTestIndex(Number(e.target.value))}
          >
            {testResults.map((test, idx) => (
              <option key={idx} value={idx}>
                {test.testName}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-100"
          >
            {sortAsc ? <FaSortAmountDown /> : <FaSortAmountUp />}
            Sort
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-indigo-600">{selectedTest.testName}</h3>
          <span className="text-sm text-gray-500">{selectedTest.date}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-200 px-3 py-2">Subject</th>
                <th className="border-b border-gray-200 px-3 py-2">Obtained</th>
                <th className="border-b border-gray-200 px-3 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {sortedSubjects.map((subj, i) => (
                <tr key={i} className="odd:bg-gray-50">
                  <td className="px-3 py-2">{subj.subject}</td>
                  <td className="px-3 py-2 font-semibold">{subj.obtained}</td>
                  <td className="px-3 py-2">{subj.total}</td>
                </tr>
              ))}
              <tr className="bg-indigo-50 font-bold">
                <td className="px-3 py-2">Total</td>
                <td className="px-3 py-2">{totalObtained}</td>
                <td className="px-3 py-2">{totalMarks}</td>
              </tr>
              <tr className="bg-indigo-100 font-bold text-indigo-700">
                <td className="px-3 py-2">Percentage</td>
                <td className="px-3 py-2" colSpan={2}>
                  {percentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
