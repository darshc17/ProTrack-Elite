import { useState } from "react";

function ProteinRecommendations({ data, refreshLogs, refreshDashboard, refreshRecommendations }) {
  const [loggingId, setLoggingId] = useState(null);

  const formatServing = (size, unit) => {
    if (unit === "piece") return `${size} ${size === 1 ? "piece" : "pieces"}`;
    if (unit === "100ml") return `${size}ml`;
    return `${size}g`;
  };

  if (!data) {
    return (
      <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-5 text-gray-400 text-sm">
        Loading recommendations...
      </div>
    );
  }

  const { remaining_protein, recommendations } = data;

  const handleQuickLog = async (foodId, quantity, mealType) => {
    setLoggingId(`${foodId}-${mealType}`);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/food-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ foodId: Number(foodId), quantity: Number(quantity), mealType }),
      });
      if (response.ok) {
        await Promise.all([refreshLogs(), refreshDashboard(), refreshRecommendations()]);
      } else {
        alert("Failed to log food");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoggingId(null);
    }
  };

  if (remaining_protein <= 0) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-5 shadow-xl text-center">
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="text-white font-bold text-lg">Goal Completed!</h3>
        <p className="text-gray-400 text-sm mt-1">You've hit your daily protein goal. Keep it up!</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">💡</span>
        <p className="text-white font-bold text-lg">Protein Booster</p>
      </div>
      <p className="text-gray-400 text-xs mb-4">
        Need <span className="text-cyan-400 font-semibold">{remaining_protein.toFixed(1)}g</span> more protein today. Each card shows what one serving gives you:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((food) => (
          <div
            key={food.id}
            className="group relative flex justify-between items-center bg-slate-950/60 hover:bg-slate-800/60 border border-white/5 hover:border-cyan-500/30 p-3 rounded-xl transition-all duration-200 overflow-hidden"
          >
            <div className="flex-1 min-w-0 pr-2">
              <span className="text-white text-sm font-semibold truncate block">{food.food_name}</span>
              <span className="text-cyan-400 text-xs font-semibold">
                +{food.protein_per_serving}g protein
              </span>
              <span className="text-gray-500 text-[10px] block">
                per {formatServing(food.serving_size, food.serving_unit)}
              </span>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="text-orange-400 font-bold text-sm bg-orange-500/10 px-2 py-0.5 rounded-lg inline-block">
                {formatServing(food.serving_size, food.serving_unit)}
              </span>
              <span className="text-gray-500 text-[10px] mt-1 block">
                {food.calories_per_serving} kcal
              </span>
              <span className="text-purple-400 text-[10px]">
                ~{food.servings_needed}x to hit goal
              </span>
            </div>

            {/* Quick Log overlay */}
            <div className="absolute inset-0 bg-slate-900/95 flex flex-col justify-center items-center px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-[10px] text-gray-400 mb-1.5 font-semibold">
                Quick Log {formatServing(food.serving_size, food.serving_unit)} to:
              </span>
              <div className="flex gap-1.5 w-full justify-center">
                {["breakfast", "lunch", "dinner"].map((meal, i) => (
                  <button
                    key={meal}
                    disabled={loggingId !== null}
                    onClick={() => handleQuickLog(food.id, food.quantity_to_eat, meal)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition duration-150 flex-1 text-center
                      ${i === 0 ? "bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white" :
                        i === 1 ? "bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-white" :
                                  "bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white"}`}
                  >
                    {loggingId === `${food.id}-${meal}` ? "..." : meal.charAt(0).toUpperCase() + meal.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProteinRecommendations;