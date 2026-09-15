import { Sparkles, Check } from "lucide-react";

function MetaRow({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-[11px] font-mono tracking-wider text-[#7a8ba3]">{label}</span>
      <span className={`text-xs font-mono font-600 ${highlight ? "text-[#f87171]" : "text-[#e8edf5]"}`}>{value}</span>
    </div>
  );
}

export default function AIExplanation({ passage }) {
  if (!passage) return null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Sparkles size={15} className="text-[#4f8ef7]" />
        <h3 className="font-display font-600 text-[#e8edf5]">Why Was This Flagged?</h3>
      </div>

      <p className="text-sm text-[#7a8ba3] leading-relaxed">
        {passage.explanation}
      </p>

      <div className="rounded-xl border border-white/7 bg-[#0b1628] divide-y divide-white/5 p-1">
        <MetaRow label="RELATIONSHIP" value={passage.relationship} />
        <MetaRow label="CONFIDENCE" value={passage.confidence} highlight={passage.confidence === "HIGH"} />
        <MetaRow label="SEMANTIC SIMILARITY" value={`${passage.similarity}%`} highlight={passage.similarity >= 80} />
        <MetaRow label="EXACT WORD OVERLAP" value={`${passage.exactWordOverlap ?? 18}%`} />
        <MetaRow label="MEANING PRESERVED" value={passage.meaningPreserved ? "YES" : "NO"} highlight={passage.meaningPreserved} />
        <MetaRow label="STRUCTURAL SIMILARITY" value={passage.structuralSimilarity ?? "HIGH"} />
      </div>

      {passage.keySimilarities?.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-mono tracking-widest text-[#4e5f72] uppercase">Key Similarities</p>
          <ul className="flex flex-col gap-1.5">
            {passage.keySimilarities.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#7a8ba3]">
                <Check size={13} className="text-[#4f8ef7] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-[#4f8ef7]/20 bg-[#4f8ef7]/5 p-4">
        <p className="text-[11px] font-mono tracking-widest text-[#4f8ef7] uppercase mb-2">AI Interpretation</p>
        <p className="text-sm text-[#7a8ba3] leading-relaxed">
          Although only {passage.exactWordOverlap ?? 18}% of the words overlap directly, the two passages communicate nearly the same idea. The submitted text employs synonyms and structural reordering to disguise the similarity.
        </p>
      </div>
    </div>
  );
}
