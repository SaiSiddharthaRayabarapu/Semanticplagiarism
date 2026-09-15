import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

const steps = [
  "Extracting text",
  "Generating semantic embeddings",
  "Comparing document meaning",
  "Identifying suspicious passages",
  "Compiling results",
];

export default function LoadingAnalysis() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 1.2, 98);
        const step = Math.floor((next / 100) * steps.length);
        setStepIndex(Math.min(step, steps.length - 1));
        return next;
      });
    }, 24);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#050c1a] flex flex-col items-center justify-center gap-8 z-50 animate-fade-in">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-[#4f8ef7]/15" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#4f8ef7] transition-transform duration-75"
            style={{ animation: "spin 1.2s linear infinite" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield size={28} className="text-[#4f8ef7]" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-display text-xl font-600 text-[#e8edf5]">Analyzing documents...</h2>
          <p className="text-sm text-[#7a8ba3] mt-1 font-mono">{steps[stepIndex]}</p>
        </div>
      </div>

      <div className="w-72 flex flex-col gap-2">
        <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4f8ef7] rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-[11px] font-mono text-[#2e3f52]">Processing</span>
          <span className="text-[11px] font-mono text-[#4f8ef7]">{Math.floor(progress)}%</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-72">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center gap-2.5 text-xs font-mono transition-colors duration-300 ${
            i < stepIndex ? "text-[#4f8ef7]" :
            i === stepIndex ? "text-[#e8edf5]" :
            "text-[#2e3f52]"
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              i < stepIndex ? "bg-[#4f8ef7]" :
              i === stepIndex ? "bg-[#e8edf5] animate-pulse-dot" :
              "bg-white/10"
            }`} />
            {s}
          </div>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
