"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus,  FaSearch } from "react-icons/fa";

interface Payment {
  id: number;
  rollNo?: string;
  name: string;
  className: string;
  amount: number;
  type: string;
  mode: string;
  date: string;
  status: "Paid" | "Pending";
  details?: string;
}

export default function PaymentsSection() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [form, setForm] = useState({
    rollNo: "",
    name: "",
    className: "",
    amount: "",
    type: "Monthly",
    mode: "Online",
    details: "",
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Payment | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("adminPayments");
    if (saved) setPayments(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("adminPayments", JSON.stringify(payments));
  }, [payments]);

  const addPayment = () => {
    if (!form.name.trim() || !form.className.trim() || !form.amount.trim()) return;
    const newPayment: Payment = {
      id: Date.now(),
      rollNo: form.rollNo,
      name: form.name,
      className: form.className,
      amount: parseFloat(form.amount),
      type: form.type,
      mode: form.mode,
      details: form.details,
      date: new Date().toLocaleDateString(),
      status: "Pending",
    };
    setPayments([...payments, newPayment]);
    setForm({ rollNo: "", name: "", className: "", amount: "", type: "Monthly", mode: "Online", details: "" });
  };

  const toggleStatus = (id: number) => {
    setPayments(
      payments.map((p) =>
        p.id === id ? { ...p, status: p.status === "Paid" ? "Pending" : "Paid" } : p
      )
    );
  };

  const filtered = payments.filter(
    (p) =>
      (filter === "All" || p.status === filter) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
       p.className.toLowerCase().includes(search.toLowerCase()) ||
       (p.rollNo && p.rollNo.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <motion.div className="p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">💳 Payments Management</h2>

      {/* Add Payment Form */}
      <div className="bg-white p-4 rounded-lg shadow-md border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="text" placeholder="Roll Number" className="border rounded-lg p-2" value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} />
          <input type="text" placeholder="Student Name" className="border rounded-lg p-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="text" placeholder="Class" className="border rounded-lg p-2" value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} />
          <input type="number" placeholder="Amount (₹)" className="border rounded-lg p-2" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <select className="border rounded-lg p-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option>Monthly</option>
            <option>Half-Yearly</option>
            <option>Yearly</option>
          </select>
          <select className="border rounded-lg p-2" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
            <option>Online</option>
            <option>Offline</option>
          </select>
          <input type="text" placeholder="Additional Details" className="border rounded-lg p-2 md:col-span-3" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
        </div>
        <div className="flex justify-end">
          <button onClick={addPayment} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"><FaPlus /> Add Payment</button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white shadow-sm flex-1">
          <FaSearch className="text-gray-500" />
          <input type="text" placeholder="Search by name, class or roll no" className="outline-none flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="border rounded-lg p-2 bg-white shadow-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Payment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.length === 0 && <p className="col-span-full text-center text-gray-500 py-6">No payments found</p>}
        {filtered.map((p) => (
          <motion.div key={p.id} className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition flex flex-col gap-2" onClick={() => setSelected(p)} whileHover={{ scale: 1.03 }}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-indigo-700">{p.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${p.status === "Paid" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>{p.status}</span>
            </div>
            <p className="text-gray-600">Class: {p.className}</p>
            {p.rollNo && <p className="text-gray-600">Roll No: {p.rollNo}</p>}
            <p className="text-gray-600">Amount: ₹{p.amount}</p>
            <p className="text-gray-600">Type: {p.type}, Mode: {p.mode}</p>
            <p className="text-gray-500 text-sm">{p.date}</p>
          </motion.div>
        ))}
      </div>

      {/* Payment Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 md:w-1/2 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">Payment Details</h3>
            <p><strong>Name:</strong> {selected.name}</p>
            {selected.rollNo && <p><strong>Roll No:</strong> {selected.rollNo}</p>}
            <p><strong>Class:</strong> {selected.className}</p>
            <p><strong>Amount:</strong> ₹{selected.amount}</p>
            <p><strong>Type:</strong> {selected.type}</p>
            <p><strong>Mode:</strong> {selected.mode}</p>
            <p><strong>Date:</strong> {selected.date}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            {selected.details && <p className="mt-2 text-gray-600"><strong>Notes:</strong> {selected.details}</p>}
            <button onClick={() => setSelected(null)} className="absolute top-2 right-2 text-gray-500 hover:text-black">✕</button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
