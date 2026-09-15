import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import RiskBadge from "./RiskBadge";
import ProgressBar from "./ProgressBar";

export default function SectionTable({ sections }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col divide-y divide-white/5">
      {sections.map((s) => (
        <div
          key={s.name}
          className="flex items-center gap-4 py-3 group cursor-pointer hover:bg-white/2 rounded-lg px-2 -mx-2 transition-colors"
          onClick={() => navigate("/sections")}
        >
          <div className="w-32 flex-shrink-0">
            <p className="text-sm font-medium text-[#e8edf5]">{s.name}</p>
            {s.suspiciousPassages > 0 && (
              <p className="text-[10px] font-mono text-[#4e5f72]">{s.suspiciousPassages} passages</p>
            )}
          </div>
          <div className="flex-1">
            <ProgressBar value={s.similarity} height="h-1" />
          </div>
          <div className="w-12 text-right">
            <span className="font-mono text-sm font-600 text-[#e8edf5]">{s.similarity}%</span>
          </div>
          <div className="w-24 flex-shrink-0">
            <RiskBadge level={s.risk} />
          </div>
          <ArrowRight size={14} className="text-[#2e3f52] group-hover:text-[#4f8ef7] transition-colors flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}
