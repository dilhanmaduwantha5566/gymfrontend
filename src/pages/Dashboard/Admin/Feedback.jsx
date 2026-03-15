import React, { useEffect, useState } from "react";
import api from "../../../helpers/api";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching feedbacks: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Member Feedback
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-600 text-white rounded-t-xl">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Review
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Progress
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.map((f) => (
              <tr
                key={f._id}
                className="hover:bg-red-50 transition-colors duration-300"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {f.memberName || "Anonymous"}
                </td>
                <td className="px-6 py-4 font-bold text-red-600">
                  {f.rating} ⭐
                </td>
                <td className="px-6 py-4 text-gray-700">{f.review}</td>
                <td className="px-6 py-4 text-gray-700">{f.progress || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {feedbacks.length === 0 && (
          <p className="mt-6 text-center text-gray-500 font-medium">
            No feedbacks submitted yet.
          </p>
        )}
      </div>
    </div>
  );
}
