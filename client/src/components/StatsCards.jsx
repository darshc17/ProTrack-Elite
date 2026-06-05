function StatsCards({ dashboard }) {
  const cards = [
    { title: "Protein", value: dashboard.total_protein + "g" },
    { title: "Calories", value: dashboard.total_calories },
    { title: "Goal", value: dashboard.protein_goal + "g" },
    { title: "Remaining", value: (dashboard.protein_goal - dashboard.total_protein).toFixed(1) + "g" },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mt-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-6 shadow-xl"
        >
          <p className="text-gray-400">{card.title}</p>
          <h2 className="text-4xl font-bold text-white mt-3">{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;