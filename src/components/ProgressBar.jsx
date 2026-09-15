export default function ProgressBar({ value, showLabel = false, height = "h-1.5" }) {
  const color =
    value >= 80 ? "bg-red-400" :
    value >= 50 ? "bg-amber-400" :
    "bg-emerald-400";

  return (
    <div className="flex items-center gap-3">
      <div className={`flex-1 bg-white/5 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      {showLabel && (
        <span className="font-mono text-xs text-[#7a8ba3] w-8 text-right">{value}%</span>
      )}
    </div>
  );
}
