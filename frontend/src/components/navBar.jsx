import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sticky top-3 z-50">
      <nav className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#2563EB]">
          AquaSense
        </Link>

        <div className="hidden md:flex space-x-6 font-medium">
          <Link
            to="/about"
            className="text-[#111827] hover:text-[#2563EB] transition"
          >
            About
          </Link>
          <Link
            to="/help"
            className="text-[#111827] hover:text-[#2563EB] transition"
          >
            Help
          </Link>
          <Link
            to="/contact"
            className="text-[#111827] hover:text-[#2563EB] transition"
          >
            Contact
          </Link>
        </div>

        <div className="space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-[#2563EB] border border-[#2563EB] rounded-full hover:bg-[#2563EB] hover:text-white transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold bg-[#2563EB] text-white rounded-full hover:bg-[#1E40AF] transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
