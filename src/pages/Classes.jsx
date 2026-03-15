import { FaDumbbell, FaRunning, FaHeartbeat, FaFire, FaBiking, FaSpa } from "react-icons/fa";

export default function Classes() {
  const classes = [
    { title: "Strength Training", icon: <FaDumbbell className="text-4xl text-red-600" />, desc: "Build muscle and power using professional resistance and weight programs." },
    { title: "Cardio Blast", icon: <FaRunning className="text-4xl text-red-600" />, desc: "Boost stamina and burn calories with high-energy cardio workouts." },
    { title: "HIIT Burn", icon: <FaFire className="text-4xl text-red-600" />, desc: "Short, intense sessions designed to torch fat and increase endurance." },
    { title: "Cross Training", icon: <FaBiking className="text-4xl text-red-600" />, desc: "A mix of strength and cardio workouts to improve overall athletic ability." },
    { title: "Yoga & Recovery", icon: <FaSpa className="text-4xl text-red-600" />, desc: "Improve flexibility, balance, and recovery through guided yoga sessions." },
    { title: "Functional Fitness", icon: <FaHeartbeat className="text-4xl text-red-600" />, desc: "Train movements used in daily life to increase strength and mobility." },
  ];

  return (
    <div className="min-h-screen bg-gray-200 pt-32 pb-24">

      {/* Page Header */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          <span className="text-black">Our</span>{" "}
          <span className="text-red-600">Classes</span>
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose from a variety of expert-led classes designed for every fitness level.
        </p>
      </div>

      {/* Classes Grid */}
      <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-3">

        {classes.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="mb-6">
              {item.icon}
            </div>

            <h3 className="text-xl font-bold text-black mb-3">
              {item.title}
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}