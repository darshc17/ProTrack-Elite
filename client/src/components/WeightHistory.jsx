function WeightHistory({ weights }) {
  if (weights.length === 0) {
    return <p className="text-gray-500 text-sm">No weight logs yet.</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Weight History</h3>
      <div className="space-y-2">
        {weights.map((log) => (
          <div key={log.id} className="flex justify-between items-center bg-slate-800 px-4 py-3 rounded-xl">
            <span className="text-white font-semibold">{log.weight} kg</span>
            <span className="text-gray-400 text-sm">
              {new Date(log.log_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeightHistory;