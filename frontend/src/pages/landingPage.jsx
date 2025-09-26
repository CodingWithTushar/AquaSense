import React from "react";
import {
  Activity,
  Droplets,
  ShieldCheck,
  Smartphone,
  Bell,
  BarChart,
  HeartPulse,
  Users,
  LineChart,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/navBar";

function LandingPage() {
  return (
    <div className="bg-[#F9FAFC] min-h-screen text-[#111827]">
      <Navbar />

      <header className="relative bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Protect Communities with Smart Health Insights
            </h1>
            <p className="mt-4 text-lg opacity-90">
              An AI-powered system to detect, monitor, and prevent water-borne
              diseases before they spread.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-full bg-white text-[#2563EB] font-semibold shadow hover:shadow-lg transition"
              >
                Get Started
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-[#2563EB] transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="/img2.jpg"
              alt="Health Surveillance"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <p className="text-[#6B7280]">Trusted By Leading Organizations</p>
        <div className="flex justify-center gap-8 mt-6 opacity-70">
          <img src="/partner1.png" alt="Partner 1" className="h-10" />
          <img src="/partner2.png" alt="Partner 2" className="h-10" />
          <img src="/partner3.png" alt="Partner 3" className="h-10" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Droplets className="text-[#2563EB]" size={32} />,
              title: "Water Quality Monitoring",
              desc: "Track contamination using sensors & test kits.",
            },
            {
              icon: <Activity className="text-[#2563EB]" size={32} />,
              title: "AI Predictions",
              desc: "Detect outbreak patterns with machine learning.",
            },
            {
              icon: <ShieldCheck className="text-[#2563EB]" size={32} />,
              title: "Early Alerts",
              desc: "Real-time alerts to officials for quick response.",
            },
            {
              icon: <Smartphone className="text-[#2563EB]" size={32} />,
              title: "Mobile App",
              desc: "Report symptoms & issues in multiple languages.",
            },
            {
              icon: <Bell className="text-[#2563EB]" size={32} />,
              title: "Community Reporting",
              desc: "Local clinics & volunteers keep the system updated.",
            },
            {
              icon: <BarChart className="text-[#2563EB]" size={32} />,
              title: "Health Dashboards",
              desc: "Track interventions & manage resources effectively.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow hover:-translate-y-1 hover:shadow-lg transition"
            >
              {f.icon}
              <h3 className="text-xl font-semibold mt-3">{f.title}</h3>
              <p className="text-[#6B7280] mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#F1F5F9] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <Users className="mx-auto text-[#2563EB]" size={40} />
              <h3 className="text-xl font-semibold mt-4">1. Collect Data</h3>
              <p className="text-[#6B7280] mt-2">
                From clinics, workers & sensors in real time.
              </p>
            </div>
            <div className="p-6">
              <LineChart className="mx-auto text-[#2563EB]" size={40} />
              <h3 className="text-xl font-semibold mt-4">
                2. Analyze & Predict
              </h3>
              <p className="text-[#6B7280] mt-2">
                AI models predict outbreaks before they spread.
              </p>
            </div>
            <div className="p-6">
              <HeartPulse className="mx-auto text-[#2563EB]" size={40} />
              <h3 className="text-xl font-semibold mt-4">3. Alert & Respond</h3>
              <p className="text-[#6B7280] mt-2">
                Authorities receive instant alerts to take action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center">What People Say</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Meera Sharma",
              text: "This system saved lives during last year's outbreak.",
            },
            {
              name: "Amit Verma",
              text: "As an ASHA worker, it helps me report and get updates fast.",
            },
            {
              name: "Global Health Org",
              text: "We can now allocate resources better and faster.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <p className="italic text-[#6B7280]">“{t.text}”</p>
              <h4 className="mt-4 font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#F1F5F9] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">FAQs</h2>
          <div className="mt-10 space-y-4">
            <div className="collapse bg-white rounded-xl shadow">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">
                How does the system collect data?
              </div>
              <div className="collapse-content text-[#6B7280]">
                We use clinics, ASHA workers, mobile apps, and sensors.
              </div>
            </div>
            <div className="collapse bg-white rounded-xl shadow">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">
                Is it available offline?
              </div>
              <div className="collapse-content text-[#6B7280]">
                Yes, our mobile app supports offline data entry.
              </div>
            </div>
            <div className="collapse bg-white rounded-xl shadow">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">
                Who can use this platform?
              </div>
              <div className="collapse-content text-[#6B7280]">
                Government bodies, NGOs, clinics, and volunteers.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Be Part of the Health Revolution
        </h2>
        <p className="mt-4 text-lg opacity-90">
          Join thousands working together for safer, healthier communities.
        </p>
        <Link
          to="/signup"
          className="mt-6 inline-block px-8 py-3 rounded-full bg-white text-[#2563EB] font-semibold shadow hover:shadow-lg transition"
        >
          Join Now
        </Link>
      </section>

      <footer className="bg-[#111827] text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg">HealthApp</h3>
            <p className="text-[#9CA3AF] mt-2">
              Smart surveillance for a healthier future.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Links</h4>
            <ul className="mt-2 space-y-2 text-[#9CA3AF]">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="#features">Features</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/contact"}>FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Contact</h4>
            <ul className="mt-2 space-y-2 text-[#9CA3AF]">
              <li>Email: support@healthapp.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: New Delhi, India</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex gap-4 mt-2">
              <a href="#" className="hover:text-[#2563EB]">
                FB
              </a>
              <a href="#" className="hover:text-[#2563EB]">
                X
              </a>
              <a href="#" className="hover:text-[#2563EB]">
                IN
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-[#9CA3AF] text-sm">
          © {new Date().getFullYear()} HealthApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
