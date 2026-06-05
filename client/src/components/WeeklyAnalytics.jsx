function WeeklyAnalytics({ weeklyData }) {
  return (
    <div className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Weekly Summary</h2>
      <div className="space-y-5">
        <div>
          <p className="text-gray-400 text-sm">Weekly Protein</p>
          <p className="text-3xl font-bold text-cyan-400 mt-1">{parseFloat(weeklyData.weekly_protein).toFixed(0)}g</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Avg Daily Protein</p>
          <p className="text-3xl font-bold text-purple-400 mt-1">{parseFloat(weeklyData.avg_daily_protein).toFixed(0)}g</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Avg Daily Calories</p>
          <p className="text-3xl font-bold text-orange-400 mt-1">{parseFloat(weeklyData.avg_daily_calories).toFixed(0)} kcal</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Days Tracked</p>
          <p className="text-3xl font-bold text-white mt-1">{weeklyData.days_tracked}</p>
        </div>
      </div>
    </div>
  );
}

export default WeeklyAnalytics;