"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const classSubjects = {
  "6th": ["Hindi", "English", "Math", "Science"],
  "7th": ["Hindi", "English", "Math", "Science"],
  "8th": ["Hindi", "English", "Math", "Science"],
  "9th": ["Math", "Science"],
  "10th": ["Math", "Science"],
  "11th": ["Physics", "Chemistry", "Math"],
  "12th": ["Physics", "Chemistry", "Math"],
};

const paymentAmounts = {
  Monthly: 1000,
  "Half-Yearly": 5500,
  Yearly: 10000,
};

export default function RegistrationPage() {
  const [step, setStep] = useState(1);

  const [personal, setPersonal] = useState({
    fullName: "",
    fatherName: "",
    phone: "",
    whatsapp: "",
    sameWhatsapp: false,
    village: "",
  });

  const [classInfo, setClassInfo] = useState({
    selectedClass: "",
    paymentType: "",
  });

  const [subjects, setSubjects] = useState<string[]>([]);
  const [paymentOption, setPaymentOption] = useState<"online" | "offline">("offline");

  // Sync WhatsApp
  useEffect(() => {
    if (personal.sameWhatsapp) setPersonal(prev => ({ ...prev, whatsapp: prev.phone }));
  }, [personal.sameWhatsapp, personal.phone]);

  const validateStep = () => {
    if (step === 1) {
      if (!personal.fullName || !personal.fatherName || !personal.phone || !personal.village) {
        toast.error("All fields are required!");
        return false;
      }
      if (!/^\d{10}$/.test(personal.phone)) {
        toast.error("Phone number must be 10 digits!");
        return false;
      }
      if (!personal.sameWhatsapp && !personal.whatsapp) {
        toast.error("WhatsApp number is required or select 'same as phone'");
        return false;
      }
    }
    if (step === 2) {
      if (!classInfo.selectedClass) {
        toast.error("Please select class");
        return false;
      }
      if (!classInfo.paymentType) {
        toast.error("Please select payment type");
        return false;
      }
    }
    if (step === 3) {
      if (subjects.length === 0) {
        toast.error("Please select at least one subject");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const toggleSubject = (subject: string) => {
    setSubjects(prev => prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]);
  };

  const handleSubmit = () => {
    const data = { ...personal, ...classInfo, subjects, paymentOption };
    if (paymentOption === "online") {
      const rollNo = `LKD${Math.floor(Math.random() * 10000)}`;
      toast.success(`Online payment successful! Roll No: ${rollNo}`);
      console.log({ ...data, rollNo, paymentStatus: "Paid" });
    } else {
      toast.success("Offline registration saved. Payment pending.");
      console.log({ ...data, rollNo: null, paymentStatus: "Due" });
    }
    // TODO: Save data to backend / Excel
  };

  return (
    <>
      <Navbar />
      <section className="py-28 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center relative">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Register for Courses</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
          Fill your details, select class & subjects, and complete registration.
        </p>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white rounded-t-[50%]" />
      </section>

      <section className="py-20 px-6 md:px-12 bg-white -mt-12 relative z-10 max-w-3xl mx-auto rounded-2xl shadow-lg">
        {/* Step 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Step 1: Personal Details</h2>
            <input type="text" placeholder="Full Name *" value={personal.fullName} onChange={e => setPersonal({ ...personal, fullName: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"/>
            <input type="text" placeholder="Father's Name *" value={personal.fatherName} onChange={e => setPersonal({ ...personal, fatherName: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"/>
            <input type="tel" placeholder="Phone Number *" value={personal.phone} onChange={e => setPersonal({ ...personal, phone: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"/>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={personal.sameWhatsapp} onChange={e => setPersonal({ ...personal, sameWhatsapp: e.target.checked })}/>
              <label>Use same number for WhatsApp</label>
            </div>
            {!personal.sameWhatsapp && (
              <input type="tel" placeholder="WhatsApp Number *" value={personal.whatsapp} onChange={e => setPersonal({ ...personal, whatsapp: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"/>
            )}
            <input type="text" placeholder="Village *" value={personal.village} onChange={e => setPersonal({ ...personal, village: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"/>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Step 2: Class & Payment</h2>
            <select value={classInfo.selectedClass} onChange={e => setClassInfo({ ...classInfo, selectedClass: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option value="">-- Select Class --</option>
              {Object.keys(classSubjects).map(cls => <option key={cls} value={cls}>{cls}</option>)}
            </select>
            <select value={classInfo.paymentType} onChange={e => setClassInfo({ ...classInfo, paymentType: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option value="">-- Select Payment Type --</option>
              <option value="Monthly">Monthly</option>
              <option value="Half-Yearly">Half-Yearly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Step 3: Subjects Selection</h2>
            <p className="text-gray-700">Choose subjects for {classInfo.selectedClass}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
              {classSubjects[classInfo.selectedClass as keyof typeof classSubjects]?.map(sub => (
                <button key={sub} type="button" onClick={() => toggleSubject(sub)} className={`px-4 py-2 rounded-lg border transition ${subjects.includes(sub) ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-indigo-100"}`}>{sub}</button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Step 4: Summary & Payment</h2>
            <p><b>Full Name:</b> {personal.fullName}</p>
            <p><b>Fathern&apos;s Name:</b> {personal.fatherName}</p>
            <p><b>Phone:</b> {personal.phone}</p>
            <p><b>WhatsApp:</b> {personal.whatsapp}</p>
            <p><b>Village:</b> {personal.village}</p>
            <p><b>Class:</b> {classInfo.selectedClass}</p>
            <p><b>Subjects:</b> {subjects.join(", ")}</p>
            <p><b>Payment Type:</b> {classInfo.paymentType} (₹{paymentAmounts[classInfo.paymentType as keyof typeof paymentAmounts]})</p>
            <div className="flex gap-4 mt-4">
              <button className={`px-6 py-3 rounded-xl font-bold border ${paymentOption==="online"?"bg-indigo-600 text-white":"bg-white text-indigo-600"}`} onClick={()=>setPaymentOption("online")}>Pay Online</button>
              <button className={`px-6 py-3 rounded-xl font-bold border ${paymentOption==="offline"?"bg-indigo-600 text-white":"bg-white text-indigo-600"}`} onClick={()=>setPaymentOption("offline")}>Pay Offline</button>
            </div>
            <button onClick={handleSubmit} className="bg-yellow-400 text-indigo-900 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform mt-4">Confirm Registration</button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step>1 && <button onClick={prevStep} className="px-6 py-2 rounded-lg border font-semibold hover:bg-gray-100 transition">Previous</button>}
          {step<4 && <button onClick={nextStep} className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">Next</button>}
        </div>
      </section>

      <Footer />
    </>
  );
}
