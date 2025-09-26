import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  BookOpen,
  MapPin,
  GraduationCap,
  FileText,
  LifeBuoy,
  AlertTriangle,
} from "lucide-react";
import Sidebar from "../components/sideBar";

function UserDashboard() {
  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      
      <Sidebar role="user" />

      
      <div className="flex-1 p-6">
        
        <h1 className="text-3xl font-bold text-[#111827] mb-6">
          Welcome Back 👋
        </h1>

        
        <h2 className="text-xl font-bold mb-4 text-[#111827]">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Link
            to="/user/education"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
          >
            <GraduationCap size={32} />
            <h3 className="mt-3 font-semibold text-lg">Education</h3>
            <p className="text-sm opacity-80">Learn disease prevention</p>
          </Link>

          <Link
            to="/user/hotspots"
            className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
          >
            <MapPin size={32} />
            <h3 className="mt-3 font-semibold text-lg">Hotspots</h3>
            <p className="text-sm opacity-80">Track risky areas</p>
          </Link>

          <Link
            to="/user/reports"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
          >
            <FileText size={32} />
            <h3 className="mt-3 font-semibold text-lg">Reports</h3>
            <p className="text-sm opacity-80">Check water reports</p>
          </Link>

          <Link
            to="/user/help"
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
          >
            <LifeBuoy size={32} />
            <h3 className="mt-3 font-semibold text-lg">Help Desk</h3>
            <p className="text-sm opacity-80">Get assistance</p>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-black">
            <Bell className="text-[#F59E0B]" /> Latest Alerts
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 bg-amber-50 border-l-4 border-amber-400 p-3 rounded text-gray-700 shadow-sm">
              <AlertTriangle className="text-amber-500" size={20} />
              🚨 Cholera outbreak reported nearby. Maintain hygiene!
            </li>
            <li className="flex items-center gap-2 bg-blue-50 border-l-4 border-blue-400 p-3 rounded text-gray-700 shadow-sm">
              <AlertTriangle className="text-blue-500" size={20} />
              💧 Water contamination detected. Avoid drinking tap water.
            </li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-black">
            <BookOpen className="text-[#2563EB]" /> Health Education
          </h2>
          <p className="text-[#374151] leading-relaxed">
            💡 Learn how to prevent water-borne diseases with hygiene awareness,
            boiling water, and proper sanitation. Explore detailed guides in
            multiple local languages to stay safe and healthy.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-black">
            <MapPin className="text-[#DC2626]" /> Hotspot Areas
          </h2>
          <p className="text-[#374151] leading-relaxed">
            ⚠️ Villages <span className="font-semibold">A</span>,{" "}
            <span className="font-semibold">B</span>, and{" "}
            <span className="font-semibold">C</span> are marked{" "}
            <span className="text-red-600 font-bold">High Risk</span> due to
            water pollution and seasonal outbreaks. Avoid unsafe water sources
            and report issues immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
