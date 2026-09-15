import { ChevronLeft, ChevronRight } from "lucide-react";

function DocPanel({ title, text, tag }) {
  return (
    <div className="flex-1 min-w-0 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono tracking-widest text-[#4e5f72] uppercase">{title}</span>
        <span className="text-[10px] font-mono text-[#4f8ef7] bg-[#4f8ef7]/10 border border-[#4f8ef7]/20 px-1.5 py-0.5 rounded-full">{tag}</span>
      </div>
      <div className="rounded-xl border border-[#4f8ef7]/20 bg-[#4f8ef7]/5 p-4">
        <p className="text-sm text-[#e8edf5] leading-relaxed font-body">{text}</p>
      </div>
    </div>
  );
}

export default function EvidenceViewer({ passages, index, onIndex }) {
  if (!passages?.length) return null;
  const p = passages[index];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-widest text-[#4e5f72]">
            SUSPICIOUS PASSAGE {index + 1} OF {passages.length}
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#4e5f72]">SIMILARITY</span>
              <span className="font-mono font-700 text-[#f87171]">{p.similarity}%</span>
            </div>
            <span className="text-white/10">·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#4e5f72]">TYPE</span>
              <span className="font-mono text-xs text-[#e8edf5] bg-white/5 px-2 py-0.5 rounded-full">{p.relationship}</span>
            </div>
            <span className="text-white/10">·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#4e5f72]">CONFIDENCE</span>
              <span className="font-mono text-xs font-600 text-amber-400">{p.confidence}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onIndex(Math.max(0, index - 1))}
            disabled={index === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/7 text-xs font-mono text-[#7a8ba3] hover:text-[#e8edf5] hover:border-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={13} /> Prev
          </button>
          <button
            onClick={() => onIndex(Math.min(passages.length - 1, index + 1))}
            disabled={index === passages.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/7 text-xs font-mono text-[#7a8ba3] hover:text-[#e8edf5] hover:border-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight size={13} />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <DocPanel title="Source Document" text={p.source} tag="ORIGINAL" />
        <div className="hidden sm:flex w-px bg-white/5 self-stretch" />
        <DocPanel title="Submitted Document" text={p.submission} tag="SUBMITTED" />
      </div>
    </div>
  );
}
