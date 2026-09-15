import RiskBadge from "./RiskBadge";

export default function PassageCard({ passage, active, onClick }) {
  const confidenceColor =
    passage.confidence === "HIGH" ? "text-red-400" :
    passage.confidence === "MEDIUM" ? "text-amber-400" :
    "text-emerald-400";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border p-3 transition-all ${
        active
          ? "border-[#4f8ef7]/40 bg-[#4f8ef7]/8"
          : "border-white/7 bg-[#0b1628] hover:border-white/12 hover:bg-white/2"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono tracking-widest text-[#4e5f72]">PASSAGE {passage.id}</span>
        <span className={`text-[10px] font-mono font-600 ${confidenceColor}`}>{passage.confidence}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono font-700 text-lg text-[#e8edf5]">{passage.similarity}%</span>
        <span className="text-[10px] font-mono text-[#4e5f72] bg-white/5 px-2 py-0.5 rounded-full">
          {passage.relationship}
        </span>
      </div>
    </button>
  );
}
