"use client";

export default function StudentPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {children}
    </div>
  );
}
