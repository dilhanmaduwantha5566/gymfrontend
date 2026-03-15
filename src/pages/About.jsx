import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-200 text-gray-100 pt-32 pb-24 flex flex-col items-center">
      
      {/* Page Header */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
        <span className="text-black">About</span>{" "}
        <span className="text-red-600">Supreme Fitness</span>
      </h2>

      <p className="text-lg text-gray-700 max-w-2xl text-center mb-12">
        Welcome to <span className="font-semibold text-black">Supreme Fitness</span> — 
        your destination for strength, stamina, and community wellness in the 
        Elpitiya region of Sri Lanka. We are dedicated to helping individuals 
        improve their health, build confidence, and achieve their fitness goals 
        in a supportive and motivating environment.
      </p>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mb-12">
        
        <div className="bg-white shadow-lg rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-red-600 mb-3">Our Vision</h3>
          <p className="text-gray-600">
            To become the leading fitness destination in the region by inspiring 
            people to adopt healthier lifestyles and empowering them to achieve 
            their full physical and mental potential.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-red-600 mb-3">Our Mission</h3>
          <p className="text-gray-600">
            Our mission is to provide high-quality fitness facilities, expert 
            training guidance, and a positive community atmosphere that helps 
            every member stay motivated and committed to their health journey.
          </p>
        </div>

      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-black mb-2">
            World-Class Equipment
          </h3>
          <p className="text-gray-600 text-sm">
            Fully equipped gym floor with cardio machines, strength training, 
            free weights, and functional gear to suit every workout style.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-black mb-2">
            Expert Trainers
          </h3>
          <p className="text-gray-600 text-sm">
            Certified trainers ready to guide you with personalized plans, 
            technique support, and motivation tailored to your goals.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-black mb-2">
            Community & Support
          </h3>
          <p className="text-gray-600 text-sm">
            A welcoming community atmosphere with fellow fitness enthusiasts 
            to keep you inspired and consistent.
          </p>
        </div>

      </div>

    </div>
  );
}