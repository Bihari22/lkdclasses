import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import PageTransition from "../components/PageTransition";

export const metadata = {
  title: "LKD Classes | Learn with Excellence",
  description: "LKD Classes — inspiring education for every student.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: { fontSize: "14px", borderRadius: "8px", padding: "12px 16px" },
          }}
        />

        {/* Page transitions now in client component */}
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
