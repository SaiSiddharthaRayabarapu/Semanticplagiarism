import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import Navbar from "../components/Navbar";
import EvidenceViewer from "../components/EvidenceViewer";
import PassageCard from "../components/PassageCard";
import AIExplanation from "../components/AIExplanation";

export default function Evidence({ data }) {
  const navigate = useNavigate();
  const [passageIndex, setPassageIndex] = useState(0);

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

  const current = data.passages[passageIndex];

  return (
    <div className="min-h-screen bg-[#050c1a]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-1">
            <Eye size={15} className="text-[#4f8ef7]" />
            <span className="text-[11px] font-mono tracking-widest text-[#4e5f72] uppercase">Evidence Viewer</span>
          </div>
          <h1 className="font-display text-2xl font-700 text-[#e8edf5]">Suspicious Passages</h1>
          <p className="text-sm text-[#4e5f72] mt-1">
            {data.passages.length} passages flagged across {data.sections.length} sections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Sidebar: passage list */}
          <div className="lg:col-span-1">
            <p className="text-[11px] font-mono tracking-widest text-[#4e5f72] uppercase mb-3">Passages</p>
            <div className="flex flex-col gap-2">
              {data.passages.map((p, i) => (
                <PassageCard
                  key={p.id}
                  passage={p}
                  active={i === passageIndex}
                  onClick={() => setPassageIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Main panel */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Evidence viewer */}
            <div className="rounded-2xl border border-white/7 bg-[#0b1628] p-6">
              <EvidenceViewer
                passages={data.passages}
                index={passageIndex}
                onIndex={setPassageIndex}
              />
            </div>

            {/* AI Explanation */}
            <div className="rounded-2xl border border-white/7 bg-[#0b1628] p-6">
              <AIExplanation passage={current} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
