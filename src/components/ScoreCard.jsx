export default function ScoreCard({ label, value, sub, accent = false, children }) {
  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-1 ${
      accent
        ? "bg-[#4f8ef7]/8 border-[#4f8ef7]/20"
        : "bg-[#0b1628] border-white/7"
    }`}>
      <p className="text-[11px] font-mono tracking-widest text-[#7a8ba3] uppercase">{label}</p>
      <p className="font-display text-2xl font-700 text-[#e8edf5] leading-none">{value}</p>
      {sub && <p className="text-xs text-[#4e5f72] mt-0.5">{sub}</p>}
      {children}
    </div>
  );
}
