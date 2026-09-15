import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Zap } from "lucide-react";
import FileUpload from "../components/FileUpload";
import LoadingAnalysis from "../components/LoadingAnalysis";
import { analyzeDocuments } from "../services/api";

export default function Upload({ onAnalysisComplete }) {
  const navigate = useNavigate();
  const [source, setSource] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!source || !submitted) return;
    setLoading(true);
    try {
      const result = await analyzeDocuments(source, submitted);
      onAnalysisComplete(result);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingAnalysis />;

  return (
    <div className="min-h-screen bg-[#050c1a] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/7 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#4f8ef7]/15 border border-[#4f8ef7]/30 flex items-center justify-center">
            <Shield size={16} className="text-[#4f8ef7]" />
          </div>
          <div>
            <h1 className="font-display font-700 text-[15px] text-[#e8edf5] tracking-tight leading-none">SemanticGuard</h1>
            <p className="text-[10px] font-mono text-[#4e5f72] mt-0.5">Semantic plagiarism detection powered by semantic similarity</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-[#4f8ef7] bg-[#4f8ef7]/10 border border-[#4f8ef7]/20 px-2 py-1 rounded-full tracking-widest">DEMO MODE</span>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl animate-fade-in">
          {/* Card */}
          <div className="rounded-2xl border border-white/7 bg-[#0b1628] overflow-hidden">
            {/* Card header */}
            <div className="px-8 pt-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={15} className="text-[#4f8ef7]" />
                <span className="text-[11px] font-mono tracking-widest text-[#4f8ef7]">ANALYSIS ENGINE</span>
              </div>
              <h2 className="font-display text-2xl font-700 text-[#e8edf5]">Analyze Your Documents</h2>
              <p className="text-sm text-[#4e5f72] mt-1">Detect plagiarism by meaning, not just words.</p>
            </div>

            {/* Upload areas */}
            <div className="px-8 py-7 flex flex-col gap-5">
              <FileUpload
                label="Source Document"
                description="Upload the original/source document"
                file={source}
                onFile={setSource}
              />
              <div className="relative flex items-center gap-4">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[10px] font-mono tracking-widest text-[#2e3f52]">VS</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <FileUpload
                label="Submitted Document"
                description="Upload the document you want to check"
                file={submitted}
                onFile={setSubmitted}
              />
            </div>

            {/* Footer */}
            <div className="px-8 pb-8">
              <button
                onClick={handleAnalyze}
                disabled={!source || !submitted}
                className="w-full py-3 rounded-xl font-display font-600 text-[15px] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed bg-[#4f8ef7] hover:bg-[#3a7ae0] text-white disabled:hover:bg-[#4f8ef7]"
              >
                <Shield size={16} />
                Analyze Documents
              </button>
              <p className="text-center text-[11px] font-mono text-[#2e3f52] mt-3">
                No files are uploaded to any server in demo mode.
              </p>
            </div>
          </div>

          {/* Feature hints */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "Semantic Analysis", desc: "Beyond exact word matching" },
              { label: "Section Breakdown", desc: "Per-section risk scoring" },
              { label: "AI Explanation", desc: "Detailed flagging rationale" },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-white/5 bg-[#0b1628]/50 p-3 text-center">
                <p className="text-xs font-medium text-[#e8edf5]">{f.label}</p>
                <p className="text-[10px] text-[#4e5f72] mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
