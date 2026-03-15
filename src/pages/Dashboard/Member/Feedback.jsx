import React, { useState } from "react";
import { Star } from "lucide-react";
import api from "../../../helpers/api";

export default function Feedback() {
  const [name, setName] = useState(localStorage.getItem("username") || "");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) return alert("Please select a rating");
    if (!review.trim()) return alert("Review is required");

    setLoading(true);

    try {
      await api.post("/feedback", {
        memberName: name,
        rating,
        review,
        progress,
      });

      alert("Feedback submitted successfully!");

      setRating(0);
      setName("");
      setReview("");
      setProgress("");
    } catch (err) {
      console.error(err);
      alert(
        "Error submitting feedback: " +
        (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Give Feedback
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Rating
          </label>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                onClick={() => setRating(star)}
                className={`cursor-pointer transition ${star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-400"
                  }`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>

          <input
            type="text"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Review */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Review
          </label>

          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="3"
            className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Progress */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Progress
          </label>

          <textarea
            placeholder="Describe your fitness progress..."
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            rows="3"
            className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}