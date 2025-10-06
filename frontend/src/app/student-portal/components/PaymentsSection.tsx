"use client";

import { useState } from "react";

const paymentsData = [
  { id: 1, amount: 500, type: "Monthly", status: "Paid", mode: "Online", date: "2025-01-05" },
  { id: 2, amount: 2500, type: "Half Yearly", status: "Pending", mode: "Offline", date: "2025-02-01" },
  { id: 3, amount: 5000, type: "Yearly", status: "Paid", mode: "Online", date: "2025-03-01" },
];

export default function PaymentsSection() {
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Payments</h2>

      <div className="grid gap-4">
        {paymentsData.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedPayment(selectedPayment === p.id ? null : p.id)}
          >
            <div className="flex justify-between">
              <span>{p.type} - ₹{p.amount}</span>
              <span
                className={`font-semibold ${p.status === "Paid" ? "text-green-600" : "text-red-600"}`}
              >
                {p.status}
              </span>
            </div>
           {selectedPayment === p.id && (
  <div className="mt-2 text-gray-700">
    {p.status === "Paid" && <p><b>Mode:</b> {p.mode}</p>}
    <p><b>Date:</b> {p.date}</p>
    {p.status === "Pending" && (
      <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Pay Now
      </button>
    )}
  </div>
)}

          </div>
        ))}
      </div>
    </div>
  );
}
