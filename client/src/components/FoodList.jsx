import ProteinRecommendations from "./ProteinRecommendations";

function FoodList({ logs, refreshLogs, refreshDashboard, refreshRecommendations, recommendationsData }) {
  const logsArray = Array.isArray(logs) ? logs : [];

  const deleteFoodLog = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/food-logs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    refreshLogs();
    refreshDashboard();
    if (refreshRecommendations) refreshRecommendations();
  };

  const meals = [
    { title: "Breakfast", mealType: "breakfast" },
    { title: "Lunch", mealType: "lunch" },
    { title: "Dinner", mealType: "dinner" },
  ];

  const totalProtein = (mealType) => {
    const total = logsArray
      .filter((l) => l.meal_type === mealType)
      .reduce((sum, l) => sum + (parseFloat(l.protein) || 0), 0);
    return total.toFixed(1);
  };

  const formatQuantity = (quantity, unit) => {
    if (unit === "piece") return `${quantity} ${quantity === 1 ? "piece" : "pieces"}`;
    if (unit === "100ml") return `${quantity}ml`;
    return `${quantity}g`;
  };

  return (
    <div className="mt-6 space-y-4">

      {/* Meal breakdown cards */}
      <div className="grid grid-cols-3 gap-4">
        {meals.map(({ title, mealType }) => {
          const mealLogs = logsArray.filter((l) => l.meal_type === mealType);
          return (
            <div key={mealType} className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-300 font-semibold">{title}</p>
                <span className="text-cyan-400 text-xs">{totalProtein(mealType)}g protein</span>
              </div>
              {mealLogs.length === 0 ? (
                <p className="text-gray-500 text-sm">No items</p>
              ) : (
                mealLogs.map((log) => (
                  <div key={log.id} className="flex justify-between items-center py-1">
                    <span className="text-white text-sm">{log.food_name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">
                        {formatQuantity(log.quantity, log.serving_unit)}
                      </span>
                      <button
                        onClick={() => deleteFoodLog(log.id)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>

      <ProteinRecommendations
        data={recommendationsData}
        refreshLogs={refreshLogs}
        refreshDashboard={refreshDashboard}
        refreshRecommendations={refreshRecommendations}
      />

    </div>
  );
}

export default FoodList;