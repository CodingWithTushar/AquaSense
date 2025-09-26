import React from "react";
import {
  AlertTriangle,
  BarChart3,
  Droplet,
  Smartphone,
  Users,
  Activity,
  Bell,
  Globe,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/navBar";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="bg-[#F8FAFC] text-[#111827]">
      <Navbar />
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 hover:scale-105 transition-all duration-200 cursor-default">
          Smart Health Surveillance & Early Warning System
        </h1>
        <p className="max-w-3xl mx-auto text-lg cursor-default">
          Detect, monitor, and help prevent outbreaks of water-borne diseases in
          vulnerable communities.
        </p>
      </section>

      <section className="py-16 px-6 bg-white cursor-default">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center hover:scale-105 transition-all duration-200">
            Problem Statement
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            This project aims to create a system that detects, monitors, and
            prevents outbreaks of water-borne diseases through data collection,
            AI/ML predictions, IoT sensors, real-time alerts, multilingual
            reporting, and dashboards for health authorities.
          </p>
          <ul className="grid gap-6 md:grid-cols-2 ">
            {[
              {
                icon: Smartphone,
                text: "Collect health data via mobile apps or SMS",
              },
              {
                icon: BarChart3,
                text: "Use AI/ML to detect patterns & predict outbreaks",
              },
              {
                icon: Droplet,
                text: "Integrate with IoT sensors for water contamination",
              },
              {
                icon: Bell,
                text: "Provide real-time alerts to health officials",
              },
              {
                icon: Globe,
                text: "Multilingual reporting & awareness campaigns",
              },
              {
                icon: Activity,
                text: "Dashboards for visualization & resource allocation",
              },
            ].map((item, index) => (
              <li
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-start gap-4 bg-[#F1F5F9] p-4 rounded-2xl shadow hover:shadow-lg"
              >
                <item.icon className="w-8 h-8 text-blue-600 hover:scale-105 transition-all duration-200" />
                <p className="text-gray-700">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F1F5F9] cursor-default">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 hover:scale-105 transition-all duration-200">
            Background
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Water-borne diseases like diarrhea, cholera, typhoid, and hepatitis
            A are prevalent in rural and tribal regions, especially during
            monsoons. Outbreaks often occur due to contaminated water, poor
            sanitation, and delayed medical response, worsened by the remoteness
            of many villages.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-white cursor-default">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center hover:scale-105 transition-all duration-200">
            Expected Solution
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Smartphone,
                title: "Mobile App",
                text: "Data collection & reporting",
              },
              {
                icon: Activity,
                title: "AI Engine",
                text: "Outbreak prediction",
              },
              {
                icon: Droplet,
                title: "Water Sensors",
                text: "Integration with IoT",
              },
              {
                icon: Bell,
                title: "Alerts",
                text: "Health authority notifications",
              },
              {
                icon: Users,
                title: "Education",
                text: "Hygiene awareness modules",
              },
              {
                icon: ShieldCheck,
                title: "Offline Support",
                text: "Support for tribal languages",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF] p-6 rounded-2xl shadow-md text-center hover:scale-105"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-emerald-500" />
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-center cursor-default">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 hover:scale-105 transition-all duration-200">
          Join Us in Building Healthier Communities
        </h2>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Together we can prevent water-borne diseases and save lives through
          technology and collaboration.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to={"/home"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md cursor-pointer transition-all duration-200"
          >
            Learn More
          </Link>
          <Link
            to={"/signup"}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium shadow-md cursor-pointer transition-all duration-200"
          >
            Get Involved
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
