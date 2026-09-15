export default function RiskBadge({ level, size = "sm" }) {
  const config = {
    HIGH: { label: "HIGH RISK", bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/25", dot: "bg-red-400" },
    MEDIUM: { label: "MEDIUM", bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/25", dot: "bg-amber-400" },
    LOW: { label: "LOW RISK", bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/25", dot: "bg-emerald-400" },
  };
  const c = config[level] ?? config.LOW;
  const padding = size === "lg" ? "px-3 py-1.5 text-xs" : "px-2 py-0.5 text-[10px]";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-semibold tracking-widest ${c.bg} ${c.text} ${c.border} ${padding}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
