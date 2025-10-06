"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { setUser } from "@/utils/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // Admin
    if (username === "admin" && password === "admin@lkd") {
      setUser({ role: "admin" });
      toast.success("Welcome Admin!");
      router.push("/admin");
      return;
    }

    // Student
    if (username === "12100" && password === "lkd@lkdclasses") {
      setUser({ role: "student", roll: "12100", name: "Test Student" });
      toast.success("Login Successful!");
      router.push("/student-portal");
      return;
    }

    toast.error("Invalid Roll Number or Password!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-900 via-gray-900 to-indigo-700">
      <Toaster position="top-right" />
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">LKD Portal Login</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Roll Number / Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500 font-semibold"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </div>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Student: <b>12100 / lkd@lkdclasses</b> | Admin: <b>admin / admin@lkd</b>
        </p>
      </div>
    </div>
  );
}
