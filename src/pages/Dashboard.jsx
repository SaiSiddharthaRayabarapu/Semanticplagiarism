import { useNavigate } from "react-router-dom";
import { TrendingUp, AlertTriangle, FileSearch, Shield } from "lucide-react";
import Navbar from "../components/Navbar";
import ScoreCard from "../components/ScoreCard";
import RiskBadge from "../components/RiskBadge";
import SimilarityGauge from "../components/SimilarityGauge";
import SimilarityChart from "../components/SimilarityChart";
import SectionTable from "../components/SectionTable";
import ProgressBar from "../components/ProgressBar";

export default function Dashboard({ data }) {
  const navigate = useNavigate();
  if (!data) {
    return (
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#4e5f72] font-mono text-sm mb-4">No analysis loaded.</p>
          <button onClick={() => navigate("/")} className="text-[#4f8ef7] text-sm hover:underline">
            Start an analysis →
          </button>
        </div>
      </div>
    );
  }

  const overlapDiff = data.overallSimilarity - data.exactOverlap - 8;

  return (
    <div className="min-h-screen bg-[#050c1a]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
        {/* Title */}
        <div className="mb-7">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-2xl font-700 text-[#e8edf5]">Plagiarism Analysis</h1>
            <RiskBadge level={data.riskLevel} size="lg" />
          </div>
          <p className="text-sm text-[#4e5f72] mt-1">Semantic comparison between source and submitted document</p>
          <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-[#2e3f52]">
            <span>{data.sourceFile}</span>
            <span>·</span>
            <span>{data.submittedFile}</span>
          </div>
        </div>

        {/* Top summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <ScoreCard label="Semantic Similarity" value={`${data.overallSimilarity}%`} accent />
          <ScoreCard label="Exact Overlap" value={`${data.exactOverlap}%`} />
          <ScoreCard label="Suspicious Passages" value={data.suspiciousPassages} />
          <ScoreCard label="Risk Level" value={data.riskLevel}>
            <RiskBadge level={data.riskLevel} />
          </ScoreCard>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left column: gauge + risk */}
          <div className="flex flex-col gap-5">
            {/* Overall similarity */}
            <div className="rounded-2xl border border-white/7 bg-[#0b1628] p-6 flex flex-col items-center gap-4">
              <div className="self-start">
                <p className="text-[11px] font-mono tracking-widest text-[#4e5f72] uppercase">Semantic Similarity</p>
              </div>
              <SimilarityGauge value={data.overallSimilarity} />
              <p className="text-xs text-[#f87171] font-mono">High semantic overlap detected</p>
              <div className="w-full flex flex-col gap-2 pt-2 border-t border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#4e5f72]">Semantic overlap</span>
                  <span className="font-mono text-sm text-[#e8edf5]">{data.overallSimilarity}%</span>
                </div>
                <ProgressBar value={data.overallSimilarity} />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-[#4e5f72]">Exact textual overlap</span>
                  <span className="font-mono text-sm text-[#e8edf5]">{data.exactOverlap}%</span>
                </div>
                <ProgressBar value={data.exactOverlap} />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-[#4e5f72]">Difference</span>
                  <span className="font-mono text-sm text-[#e8edf5]">8%</span>
                </div>
                <ProgressBar value={8} />
              </div>
            </div>

            {/* Risk assessment */}
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-400" />
                <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase">Risk Assessment</span>
              </div>
              <p className="text-sm text-[#7a8ba3] leading-relaxed">
                The submitted document contains multiple passages that preserve the meaning and structure of the source despite significant wording changes.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[11px] font-mono text-[#4e5f72]">CONFIDENCE</span>
                <span className="font-mono font-700 text-[#e8edf5]">{data.confidence}%</span>
              </div>
            </div>
          </div>

          {/* Right columns: chart + sections */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Chart */}
            <div className="rounded-2xl border border-white/7 bg-[#0b1628] p-6">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={14} className="text-[#4f8ef7]" />
                <p className="text-[11px] font-mono tracking-widest text-[#4e5f72] uppercase">Similarity Breakdown</p>
              </div>
              <p className="text-sm font-medium text-[#e8edf5] mb-4">Section-by-section comparison</p>
              <SimilarityChart sections={data.sections} />
            </div>

            {/* Section analysis */}
            <div className="rounded-2xl border border-white/7 bg-[#0b1628] p-6">
              <div className="flex items-center gap-2 mb-1">
                <FileSearch size={14} className="text-[#4f8ef7]" />
                <p className="text-[11px] font-mono tracking-widest text-[#4e5f72] uppercase">Section Analysis</p>
              </div>
              <p className="text-sm font-medium text-[#e8edf5] mb-4">Semantic similarity by document section</p>
              <SectionTable sections={data.sections} />
              <button
                onClick={() => navigate("/sections")}
                className="mt-4 text-xs text-[#4f8ef7] hover:text-[#3a7ae0] font-mono transition-colors"
              >
                View detailed section analysis →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
