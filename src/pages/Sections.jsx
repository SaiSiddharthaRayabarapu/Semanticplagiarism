import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layers } from "lucide-react";
import Navbar from "../components/Navbar";
import RiskBadge from "../components/RiskBadge";
import ProgressBar from "../components/ProgressBar";

function SectionCard({ section, onClick }) {
  const isHigh = section.similarity >= 80;
  const isMed = section.similarity >= 50;

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-5 cursor-pointer transition-all hover:-translate-y-0.5 ${
        isHigh
          ? "border-red-500/25 bg-red-500/5 hover:border-red-500/40"
          : isMed
          ? "border-amber-500/20 bg-amber-500/4 hover:border-amber-500/35"
          : "border-white/7 bg-[#0b1628] hover:border-white/15"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display font-600 text-[#e8edf5]">{section.name}</h3>
        <RiskBadge level={section.risk} />
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="font-mono font-700 text-2xl text-[#e8edf5]">{section.similarity}%</span>
        {isHigh && (
          <span className="text-[10px] font-mono tracking-widest text-red-400">HIGH SIMILARITY</span>
        )}
        {!isHigh && isMed && (
          <span className="text-[10px] font-mono tracking-widest text-amber-400">MODERATE-HIGH</span>
        )}
      </div>

      <ProgressBar value={section.similarity} height="h-2" />

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
        <span className="text-[11px] font-mono text-[#4e5f72]">SUSPICIOUS PASSAGES</span>
        <span className="font-mono text-sm text-[#e8edf5]">{section.suspiciousPassages}</span>
      </div>
    </div>
  );
}

export default function Sections({ data }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#4e5f72] font-mono text-sm mb-4">No analysis loaded.</p>
          <button onClick={() => navigate("/")} className="text-[#4f8ef7] text-sm hover:underline">Start an analysis →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050c1a]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-1">
            <Layers size={15} className="text-[#4f8ef7]" />
            <span className="text-[11px] font-mono tracking-widest text-[#4e5f72] uppercase">Section Analysis</span>
          </div>
          <h1 className="font-display text-2xl font-700 text-[#e8edf5]">Section Analysis</h1>
          <p className="text-sm text-[#4e5f72] mt-1">Compare semantic similarity across document sections.</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mb-6">
          {[
            { label: "High ≥ 80%", color: "bg-red-400" },
            { label: "Medium 50–79%", color: "bg-amber-400" },
            { label: "Low < 50%", color: "bg-emerald-400" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${l.color}`} />
              <span className="text-[11px] font-mono text-[#4e5f72]">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {data.sections.map((s) => (
            <SectionCard
              key={s.name}
              section={s}
              onClick={() => {
                setSelected(selected?.name === s.name ? null : s);
              }}
            />
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="rounded-2xl border border-white/7 bg-[#0b1628] p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-600 text-[#e8edf5]">{selected.name} — Detailed View</h2>
              <RiskBadge level={selected.risk} size="lg" />
            </div>
            <p className="text-sm text-[#7a8ba3] mb-4">
              This section has a semantic similarity of <span className="text-[#e8edf5] font-mono">{selected.similarity}%</span> with{" "}
              <span className="text-[#e8edf5] font-mono">{selected.suspiciousPassages}</span> suspicious passages identified.
            </p>
            <button
              onClick={() => navigate("/evidence")}
              className="text-xs text-[#4f8ef7] hover:text-[#3a7ae0] font-mono transition-colors"
            >
              View evidence for this section →
            </button>
          </div>
        )}

        {/* Table summary */}
        <div className="rounded-2xl border border-white/7 bg-[#0b1628] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <p className="text-[11px] font-mono tracking-widest text-[#4e5f72] uppercase">Summary Table</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {["Section", "Similarity", "Risk", "Suspicious Passages"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-[10px] font-mono tracking-widest text-[#4e5f72] uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.sections.map((s) => (
                  <tr key={s.name} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-3 text-sm font-medium text-[#e8edf5]">{s.name}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-24">
                          <ProgressBar value={s.similarity} height="h-1" />
                        </div>
                        <span className="font-mono text-sm text-[#e8edf5]">{s.similarity}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-3"><RiskBadge level={s.risk} /></td>
                    <td className="px-6 py-3 font-mono text-sm text-[#e8edf5]">{s.suspiciousPassages}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
