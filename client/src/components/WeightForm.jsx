import { useState } from "react";

function WeightForm({ refreshWeights }) {
  const [weight, setWeight] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/weight", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ weight }),
    });
    setWeight("");
    refreshWeights();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="number"
        placeholder="Enter weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="flex-1 bg-slate-800 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-cyan-500"
      />
      <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-xl font-semibold transition">
        Save
      </button>
    </form>
  );
}

export default WeightForm;