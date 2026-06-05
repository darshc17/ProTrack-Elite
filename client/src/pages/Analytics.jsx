import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ProteinChart from "../components/ProteinChart";
import WeightChart from "../components/WeightChart";
import WeeklyAnalytics from "../components/WeeklyAnalytics";

function Analytics({ setIsLoggedIn }) {
  const [trend, setTrend] = useState([]);
  const [weightTrend, setWeightTrend] = useState([]);
  const [weekly, setWeekly] = useState(null);
  const [monthly, setMonthly] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    fetch("http://localhost:5000/dashboard/trend", { headers }).then(r => r.json()).then(setTrend);
    fetch("http://localhost:5000/weight/trend", { headers }).then(r => r.json()).then(setWeightTrend);
    fetch("http://localhost:5000/dashboard/weekly", { headers }).then(r => r.json()).then(setWeekly);
    fetch("http://localhost:5000/dashboard/monthly", { headers }).then(r => r.json()).then(setMonthly);
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-white mb-8">Analytics</h1>

        {/* Summary stat cards */}
        {weekly && monthly && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: "Weekly Protein", value: `${parseFloat(weekly.weekly_protein).toFixed(0)}g`, color: "text-cyan-400" },
              { label: "Avg Daily Protein", value: `${parseFloat(weekly.avg_daily_protein).toFixed(0)}g`, color: "text-purple-400" },
              { label: "Days Tracked", value: weekly.days_tracked, color: "text-orange-400" },
              { label: "Monthly Protein", value: `${parseFloat(monthly.monthly_protein).toFixed(0)}g`, color: "text-green-400" },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-900 border border-cyan-500/10 rounded-2xl p-5">
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className={`text-4xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Charts row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <ProteinChart data={trend} />
          <WeightChart data={weightTrend} />
        </div>

        {/* Weekly + Monthly detail */}
        {weekly && monthly && (
          <div className="grid grid-cols-2 gap-6">
            <WeeklyAnalytics weeklyData={weekly} />
            <div className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Monthly Summary</h2>
              <div className="space-y-5">
                <div>
                  <p className="text-gray-400">Total Protein</p>
                  <p className="text-3xl font-bold text-green-400 mt-1">{parseFloat(monthly.monthly_protein).toFixed(0)}g</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Calories</p>
                  <p className="text-3xl font-bold text-orange-400 mt-1">{parseFloat(monthly.monthly_calories).toFixed(0)} kcal</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Analytics;