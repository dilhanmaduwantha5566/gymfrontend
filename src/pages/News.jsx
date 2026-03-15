// File: src/pages/News.jsx
import React from "react";
import Navbar from "../components/Navbar";

export default function News() {

  const newsList = [
    {
      id: 1,
      title: "New Workout Area Opened",
      date: "January 10, 2026",
      desc: "Gym expanded with a brand-new strength and conditioning area designed for better performance and comfort.",
      image:
        "https://img.freepik.com/premium-photo/gym-with-yellow-walls-area_674594-14967.jpg",
    },
    {
      id: 2,
      title: "New Equipment Arrived",
      date: "December 12, 2025",
      desc: "Latest cardio machines and advanced weight equipment added to improve training quality.",
      image:
        "https://images.squarespace-cdn.com/content/v1/60469efa07092c2776c3ef2c/9fb05acf-5112-4028-b758-b21f8708a0a9/26a9eab1-6f53-4c7b-885f-522e9eab43c5.JPG",
    },
    {
      id: 3,
      title: "Yoga Classes Launched",
      date: "April 06, 2025",
      desc: "First Yoga class started, focusing on flexibility, posture and core strength.",
      image:
        "https://storage.kempinski.com/cdn-cgi/image/w=1920,f=auto,g=auto,fit=scale-down/ki-cms-prod/images/5/8/4/2/652485-1-eng-GB/0277816ca2fe-Spa_Yoga_1920x1080px.jpg",
    },
    {
      id: 4,
      title: "Special Guest Trainer Session",
      date: "March 22, 2025",
      desc: "A special workout session was conducted by a certified guest trainer with international experience.",
      image:
        "https://www.activ8athlete.com/wp-content/uploads/2024/04/Activ8s-Adult-Group-Training-Redefines-Fitness-Sessions-scaled.jpg",
    },
    {
      id: 5,
      title: "Opened New Locker Room Area",
      date: "January 12, 2025",
      desc: "New locker room area now available for members to use.",
      image:
        "https://www.abacussports.com/wp-content/uploads/2021/06/IMPACT-gym-Lockers-2-min.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 pt-32 pb-24">

      {/* Navbar */}
      <Navbar />

      {/* Page Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-gray-900">
          <span className="text-black">Latest</span>{" "}
          <span className="text-red-600">Gym News</span>
        </h2>

        <p className="text-gray-600 mt-5">
          Stay updated with the latest updates and improvements at Supreme Fitness
        </p>
      </div>

      {/* News Cards */}
      <div className="max-w-5xl mx-auto space-y-10 px-6">

        {newsList.map((news) => (

          <div
            key={news.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
          >

            {/* Image */}
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-64 object-cover"
            />

            {/* Content */}
            <div className="p-6">

              <h3 className="text-2xl font-bold text-red-500">
                {news.title}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                {news.date}
              </p>

              <p className="text-gray-600">
                {news.desc}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
