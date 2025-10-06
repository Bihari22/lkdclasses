"use client";

export default function ProfileSection() {
  const student = {
    rollNo: "12100",
    name: "Lalit Kumar",
    class: "6",
    fatherName: "Ramesh Kumar",
    village: "Saran",
    email: "lalit@example.com",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Profile</h2>
      <ul className="space-y-2 text-gray-700">
        <li><b>Roll No:</b> {student.rollNo}</li>
        <li><b>Name:</b> {student.name}</li>
        <li><b>Class:</b> {student.class}</li>
        <li><b>Father Name:</b> {student.fatherName}</li>
        <li><b>Village:</b> {student.village}</li>
        <li><b>Email:</b> {student.email}</li>
      </ul>
    </div>
  );
}
