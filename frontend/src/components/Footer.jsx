import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 text-gray-600 text-sm px-6 py-4 mt-auto shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-center sm:text-left">© 2025 All Rights Reserved</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-black transition">
            Privacy
          </a>
          <a href="#" className="hover:text-black transition">
            Terms
          </a>
          <a href="#" className="hover:text-black transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
