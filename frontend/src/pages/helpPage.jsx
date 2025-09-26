import React from "react";
import {
  AlertTriangle,
  Smartphone,
  Droplet,
  Bell,
  Users,
  Activity,
} from "lucide-react";
import Navbar from "../components/navBar";
import { Link } from "react-router-dom";

const HelpPage = () => {
  return (
    <div className="bg-[#F8FAFC] text-[#111827] min-h-screen">
      <Navbar />
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16 px-6 text-center cursor-default">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 hover:scale-105 transition-all duration-200">
          Help & Support
        </h1>
        <p className="max-w-3xl mx-auto text-lg">
          Find medical support, solutions for common problems, and guidance
          related to health monitoring and water-borne disease prevention.
        </p>
      </section>

      <section className="py-16 px-6 bg-white cursor-default">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center hover:scale-105 transition-all duration-200">
            Medical Support
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#F1F5F9] p-6 rounded-2xl shadow-md hover:scale-105 transition-all duration-200 ">
              <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" /> Local Clinics & ASHA
                Workers
              </h3>
              <p className="text-[#374151]">
                Connect with nearby clinics and ASHA workers for immediate
                health consultations and community support.
              </p>
            </div>
            <div className="bg-[#F1F5F9] p-6 rounded-2xl shadow-md hover:scale-105 transition-all duration-200">
              <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-emerald-500" /> Mobile App
                Reporting
              </h3>
              <p className="text-[#374151]">
                Report symptoms or community health issues directly through the
                multilingual mobile app or SMS.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F1F5F9] cursor-default">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center hover:scale-105 transition-all duration-200">
            Common Problems & Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Droplet,
                title: "Contaminated Water",
                text: "Use water testing kits and IoT sensors to detect contamination.",
              },
              {
                icon: Activity,
                title: "Disease Outbreaks",
                text: "AI-based models predict outbreaks and alert officials.",
              },
              {
                icon: Bell,
                title: "Delayed Response",
                text: "Real-time alerts ensure faster response by health authorities.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition-all duration-200"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-[#374151]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white cursor-default">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center hover:scale-105 transition-all duration-200">
            Health Problems in Focus
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Diarrhea & Cholera",
                desc: "Caused by contaminated water during monsoon seasons.",
              },
              {
                title: "Typhoid & Hepatitis A",
                desc: "Linked to poor sanitation and unsafe drinking water.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#F1F5F9] p-6 rounded-2xl shadow-md hover:scale-105 transition-all duration-200"
              >
                <h3 className="font-semibold text-xl mb-2 flex items-center gap-2 ">
                  <AlertTriangle className="w-6 h-6 text-red-600" />{" "}
                  {item.title}
                </h3>
                <p className="text-[#374151]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F1F5F9] cursor-default">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 hover:scale-105 transition-all duration-200">
            How We Can Help
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-[#374151] mb-8">
            Our digital health platform provides tools to collect data, predict
            outbreaks, monitor water quality, send alerts, and educate
            communities on prevention and hygiene.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={"/contact"}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md cursor-pointer"
            >
              Contact Support
            </Link>
            <Link
              to={"/"}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium shadow-md cursor-pointer"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
