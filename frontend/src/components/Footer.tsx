export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 to-blue-400 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Desktop Footer */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 text-left">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">LKD Classes</h3>
            <p className="text-base">Empowering students with Science, Math, English & more. Located in Sitalpur, Saran.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="text-base">
              <li><a href="/about" className="hover:text-yellow-400 transition">About</a></li>
              <li><a href="/courses" className="hover:text-yellow-400 transition">Courses</a></li>
              <li><a href="/gallery" className="hover:text-yellow-400 transition">Gallery</a></li>
              <li><a href="/register" className="hover:text-yellow-400 transition">Enroll</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-base">Phone: +918002271522</p>
            <p className="text-base">Email: lkdclasses@gmail.com</p>
            <p className="text-base">Address:Parsa Roard, Sitalpur, Saran, Bihar</p>
          </div>
        </div>

        {/* Mobile Footer - only Contact */}
        <div className="md:hidden text-center">
          <h3 className="text-lg font-bold mb-2">Contact Us</h3>
          <p className="text-sm">Phone: +918002271522</p>
          <p className="text-sm">Email: lkdclasses@gmail.com</p>
          <p className="text-sm">Address: Parsa Road, Sitalpur, Saran, Bihar</p>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-sm md:text-base text-gray-200">
          &copy; {new Date().getFullYear()} LKD Classes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

