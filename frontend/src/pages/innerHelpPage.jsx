import React, { useState } from "react";
import Sidebar from "../components/sideBar";

const InnerHelpPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const userFAQs = [
    {
      q: "How can I report a new case?",
      a: "Go to the Reports section and submit details through the form.",
    },
    {
      q: "What do the hotspot colors mean?",
      a: "Red = High Risk, Yellow = Medium Risk, Green = Low Risk.",
    },
    {
      q: "Can I use the platform offline?",
      a: "Yes, limited offline functionality is supported with auto-sync.",
    },
  ];

  const adminFAQs = [
    {
      q: "How do I approve or reject reports?",
      a: "Go to the Reports page and use the Approve/Reject buttons next to each report.",
    },
    {
      q: "How can I manage hotspots?",
      a: "Use the Hotspot section to add, edit, or remove hotspot areas.",
    },
    {
      q: "How do I manage user permissions?",
      a: "Navigate to the User Management page to modify roles and access levels.",
    },
  ];

  const role = "admin";
  const faqs = role === "admin" ? [...userFAQs, ...adminFAQs] : userFAQs;

  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F7]">
      <Sidebar role={role} />

      <div className="flex-1 p-6">
        <div className="sticky top-0 bg-[#F8FAFC]/90 backdrop-blur z-10 p-4 rounded-xl shadow-sm mb-6">
          <h1 className="text-3xl font-bold text-[#111827]">Help & Support</h1>
          <p className="text-[#6B7280] mt-1">
            Find answers to common questions and learn how to use the system.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
            >
              <h3 className="text-lg font-semibold text-[#111827] flex justify-between items-center">
                {item.q}
                <span className="text-gray-400">
                  {openFAQ === idx ? "−" : "+"}
                </span>
              </h3>
              {openFAQ === idx && (
                <p className="text-[#6B7280] mt-2">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InnerHelpPage;
