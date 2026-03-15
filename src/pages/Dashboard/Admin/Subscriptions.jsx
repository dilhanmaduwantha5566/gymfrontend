import { useState, useEffect } from "react";
import api from "../../../helpers/api";

const PlanCard = ({ plan, onEdit }) => {
  const isBestValue = plan.isBestValue || plan.title === "Elite" || plan.name === "Elite";

  return (
    <div
      className={`relative rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105
      ${isBestValue ? "ring-4 ring-red-500" : ""}`}
    >
      {/* Image */}
      <img
        src={plan.image}
        alt={plan.name}
        className="w-full h-40 object-cover"
      />

      {/* Best Value Badge */}
      {isBestValue && (
        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-4 py-1 rounded-full font-bold">
          BEST VALUE
        </div>
      )}

      <div className="p-6 bg-white text-center">
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>

        <p className="text-3xl font-extrabold text-red-600 mb-4">
          LKR {plan.price}
        </p>

        <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>

        <ul className="text-sm text-gray-600 space-y-1 mb-6">
          {plan.features.map((feature, i) => (
            <li key={i}>✔ {feature}</li>
          ))}
        </ul>

        <button
          onClick={() => onEdit(plan)}
          className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-black transition"
        >
          Edit Plan
        </button>
      </div>
    </div>
  );
};

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans");
      setPlans(res.data);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSeedPlans = async () => {
    if (!window.confirm("Seed initial plans to database?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.post("/plans/seed", {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchPlans();
    } catch (error) {
      alert("Error seeding plans or plans already seeded.");
      console.error(error);
    }
  };

  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Features should be sent as array or comma separated string depending on controller, controller supports either
      const payload = {
        name: editingPlan.name,
        price: Number(editingPlan.price),
        desc: editingPlan.desc,
        features: editingPlan.features,
        image: editingPlan.image,
        isBestValue: editingPlan.isBestValue || false
      };

      await api.put(`/plans/${editingPlan._id || editingPlan.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEditingPlan(null);
      fetchPlans();
    } catch (err) {
      console.error("Error updating plan:", err);
      alert("Failed to update plan");
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-extrabold text-center">
          Gym Subscription Plans
        </h2>
        {plans.length === 0 && (
          <button
            onClick={handleSeedPlans}
            className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-700 transition"
          >
            Seed Default Plans
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard key={plan._id || plan.id} plan={plan} onEdit={setEditingPlan} />
        ))}
      </div>

      {editingPlan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-6">
              Edit {editingPlan.name}
            </h3>

            <form onSubmit={handleUpdatePlan} className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Price</label>
                <input
                  className="w-full border p-2 rounded"
                  value={editingPlan.price}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Description</label>
                <textarea
                  className="w-full border p-2 rounded"
                  value={editingPlan.desc}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      desc: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Features (comma separated)</label>
                <textarea
                  className="w-full border p-2 rounded text-gray-800"
                  value={Array.isArray(editingPlan.features) ? editingPlan.features.join(", ") : editingPlan.features}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      features: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-2 rounded"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="flex-1 bg-gray-300 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
