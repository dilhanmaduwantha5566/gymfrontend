// File: src/pages/Blog.jsx

import React from "react";
import { FaDumbbell, FaAppleAlt, FaFire } from "react-icons/fa";

export default function Blog() {

  const articles = [
    {
      id: 1,
      title: "Top 5 Beginner Workout Tips",
      desc: "Start your fitness journey the right way with these beginner-friendly workout tips.",
      icon: <FaDumbbell className="text-red-600 text-3xl" />,
      category: "Workout Tips",
      image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1",
      link: "https://www.bodybuilding.com/content/10-beginner-workout-tips.html"
    },
    {
      id: 2,
      title: "Healthy Diet Plan for Gym Beginners",
      desc: "Learn what to eat before and after workouts to build strength and stay healthy.",
      icon: <FaAppleAlt className="text-red-600 text-3xl" />,
      category: "Diet Plan",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
      link: "https://www.healthline.com/nutrition/bodybuilding-meal-plan"
    },
    {
      id: 3,
      title: "Stay Motivated in Your Fitness Journey",
      desc: "Simple ways to keep yourself motivated and consistent in your workouts.",
      icon: <FaFire className="text-red-600 text-3xl" />,
      category: "Motivation",
      image: "https://cdn.shopify.com/s/files/1/0162/2116/files/How_To_Stay_Motivated_During_Your_Fitness_Journey.jpg?v=1611411725",
      link: "https://www.verywellfit.com/how-to-stay-motivated-to-exercise-1231120"
    },
    {
      id: 4,
      title: "Best Exercises for Weight Loss",
      desc: "Discover the most effective exercises to burn fat and improve fitness.",
      icon: <FaDumbbell className="text-red-600 text-3xl" />,
      category: "Workout Tips",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      link: "https://www.healthline.com/nutrition/best-exercises-to-lose-weight"
    },
    {
      id: 5,
      title: "High Protein Foods for Muscle Growth",
      desc: "Include these protein-rich foods in your diet to build muscle faster.",
      icon: <FaAppleAlt className="text-red-600 text-3xl" />,
      category: "Diet Plan",
      image: "https://img.etimg.com/thumb/120228430/120228430.jpg?height=746&width=420&resizemode=76&imgsize=2648343",
      link: "https://www.healthline.com/nutrition/20-delicious-high-protein-foods"
    },
    {
      id: 6,
      title: "Morning vs Evening Workouts",
      desc: "Find out which workout time works best for your body and schedule.",
      icon: <FaFire className="text-red-600 text-3xl" />,
      category: "Fitness Tips",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
      link: "https://www.healthline.com/health/exercise-fitness/morning-vs-evening-workout"
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen pt-28 pb-20">

      {/* Header */}
      <div className="text-center mb-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="text-black">Fitness </span>
          <span className="text-red-600">Blog</span>
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Expert fitness advice, workout tips, and healthy diet guides to help you achieve your goals.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">

        {articles.map((article) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >

            {/* Image */}
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">

              <div className="flex items-center gap-2 mb-3">
                {article.icon}
                <span className="text-sm text-red-600 font-semibold">
                  {article.category}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {article.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {article.desc}
              </p>

            </div>

          </a>
        ))}

      </div>
    </div>
  );
}
