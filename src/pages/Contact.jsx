import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi"; // React Icons

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-200 p-8 flex flex-col items-center justify-start text-center pt-30">
      {/* Page Title */}
      <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
        <span className="text-black">Contact</span>{" "}
        <span className="text-red-600">Supreme Fitness</span>
      </h2>

      <p className="text-lg text-gray-700 max-w-2xl mb-12">
        Have questions or want to join{" "}
        <span className="font-semibold text-black">Supreme Fitness</span>? 
        Reach out to us via email, phone, or visit our location below.
      </p>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mb-12">
        {/* Email */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition duration-300">
          <FiMail className="text-red-600 text-4xl mb-4" />
          <h3 className="text-xl font-bold text-black mb-2">Email</h3>
          <p className="text-gray-600 text-center">contact@supremefitness.com</p>
        </div>

        {/* Phone */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition duration-300">
          <FiPhone className="text-green-600 text-4xl mb-4" />
          <h3 className="text-xl font-bold text-black mb-2">Phone</h3>
          <p className="text-gray-600 text-center">+94 77 123 4567</p>
        </div>

        {/* Address */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition duration-300">
          <FiMapPin className="text-blue-600 text-4xl mb-4" />
          <h3 className="text-xl font-bold text-black mb-2">Address</h3>
          <p className="text-gray-600 text-center">
            Ambalangoda Road, Kurundugahahetekma, Elpitiya, Sri Lanka
          </p>
        </div>

      </div>

      {/* Map Button */}
      <a
        href="https://www.google.com/maps?q=Ambalangoda+Road,+Kurundugahahetekma,+Elpitiya,+Sri+Lanka"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-4 rounded-full font-bold hover:from-red-700 hover:to-red-900 transition mb-12 shadow-lg"
      >
        View Location on Map
      </a>

      {/* Location & Hours Section */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl mb-12">
        <h3 className="text-2xl font-semibold text-black mb-4">Location & Hours</h3>
        <p className="text-gray-800 text-md mb-2">
          📍 Located at: Ambalangoda Road, Kurundugahahetekma, Elpitiya, Sri Lanka
        </p>
        <p className="text-gray-700 text-md">
          🕐 Open Daily: Early morning to late evening — perfect for any schedule.
        </p>
      </div>
    </div>
  );
}
