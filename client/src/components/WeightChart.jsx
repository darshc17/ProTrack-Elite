import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function WeightChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-6 flex items-center justify-center h-64">
        <p className="text-gray-500">No weight data yet. Log your weight in Profile.</p>
      </div>
    );
  }

  const formatted = data.map((d) => ({
    ...d,
    display_date: new Date(d.log_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  }));

  return (
    <div className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Weight Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="display_date" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "12px" }}
            labelStyle={{ color: "#94a3b8" }}
            itemStyle={{ color: "#a78bfa" }}
            formatter={(value) => [`${value} kg`, "Weight"]}
          />
          <Line type="monotone" dataKey="weight" stroke="#a78bfa" strokeWidth={2} dot={{ fill: "#a78bfa", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeightChart;