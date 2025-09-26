import React, { useState } from "react";
import {
  User,
  Mail,
  FileText,
  MessageSquare,
  Phone,
  MapPin,
} from "lucide-react";
import { Input } from "../components/input";
import { Link } from "react-router-dom"; 

function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-3xl bg-[#FFFFFF] rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] overflow-hidden relative">
        
        <div className="absolute top-3 right-3">
          <Link
            to="/"
            className="px-4 py-1 text-sm font-medium bg-[#2563EB] text-white rounded-full shadow hover:bg-[#1E40AF] transition-all"
          >
            Go Back
          </Link>
        </div>

        <div className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white py-2 px-6 text-center">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-sm opacity-90 mt-1">
            We’d love to hear from you! Please fill out the form below.
          </p>
        </div>

        <div className=" px-8">
          <form onSubmit={handleSubmit}>
            <Input
              title="Full Name"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData , fullName:e.target.value})}
              icon={User}
            />

            <Input
              title="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData , email:e.target.value})}
              icon={Mail}
            />

            <Input
              title="Subject"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData , subject:e.target.value})}
              icon={FileText}
            />

            <div className="form-control w-full my-1">
              <label className="label">
                <span className="label-text text-base font-semibold text-[#111827]">
                  Message
                </span>
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3 flex items-start text-[#6B7280]">
                  <MessageSquare size={21} />
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData , message:e.target.value})}
                  placeholder="Write your message..."
                  className="w-full rounded-2xl border border-[#D1D5DB] bg-[#FFFFFF] text-[#111827] text-base px-10 py-3 shadow-sm focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] outline-none resize-none h-24 hover:ring-2 hover:ring-[#2563EB] transition-all duration-200"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-1 rounded-full bg-[#2563EB] text-white font-semibold text-lg hover:bg-[#1E40AF] transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-[#F1F5F9] mt-3 border-t border-[#E5E7EB] px-8 py-2 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Phone className="text-[#2563EB] mb-2" size={19} />
            <p className="text-sm text-[#111827] font-medium">
              +91 98765 43210
            </p>
            <p className="text-xs text-[#6B7280]">Mon - Fri, 9am - 6pm</p>
          </div>
          <div className="flex flex-col items-center">
            <Mail className="text-[#2563EB] mb-2" size={19} />
            <p className="text-sm text-[#111827] font-medium">
              support@healthapp.com
            </p>
            <p className="text-xs text-[#6B7280]">Email us anytime</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="text-[#2563EB] mb-2" size={19} />
            <p className="text-sm text-[#111827] font-medium">
              Shillong, Meghalaya
            </p>
            <p className="text-xs text-[#6B7280]">Northeastern Region</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
