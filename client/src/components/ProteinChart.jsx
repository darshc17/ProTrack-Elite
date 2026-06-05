import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function ProteinChart({ data }) {
  return (
    <div className="bg-slate-900 p-6 rounded-3xl">

      <h2 className="text-white text-2xl mb-4">
        Protein Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="protein"
            stroke="#22d3ee"
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ProteinChart;