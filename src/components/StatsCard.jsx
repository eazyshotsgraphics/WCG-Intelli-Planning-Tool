function StatsCard({ title, value, subtitle, detail, color }) {
  return (
    <div className={`bg-gradient-to-r ${color} text-white rounded-xl p-6 shadow-lg`}>
      <h3 className="text-sm uppercase font-semibold opacity-90">{title}</h3>
      <div className="text-3xl font-bold mt-2">{value}</div>
      <div className="text-sm opacity-80">{subtitle}</div>
      <p className="mt-3 text-sm opacity-90">{detail}</p>
    </div>
  );
}

export default StatsCard;
