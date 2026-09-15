import { useRef, useState } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";

const ALLOWED = [".pdf", ".docx", ".txt"];
const MAX_MB = 10;

function fmt(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function FileUpload({ label, description, file, onFile }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  function validate(f) {
    setError("");
    const ext = "." + f.name.split(".").pop().toLowerCase();
    if (!ALLOWED.includes(ext)) {
      setError(`Invalid file type. Accepted: ${ALLOWED.join(", ")}`);
      return false;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`File exceeds ${MAX_MB} MB limit.`);
      return false;
    }
    return true;
  }

  function handle(f) {
    if (f && validate(f)) onFile(f);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    handle(e.dataTransfer.files[0]);
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-mono tracking-widest text-[#7a8ba3] uppercase">{label}</p>
      {file ? (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-[#4f8ef7]/30 bg-[#4f8ef7]/6">
          <div className="w-9 h-9 rounded-lg bg-[#4f8ef7]/15 flex items-center justify-center flex-shrink-0">
            <FileText size={16} className="text-[#4f8ef7]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#e8edf5] truncate">{file.name}</p>
            <p className="text-xs text-[#4e5f72]">{fmt(file.size)}</p>
          </div>
          <button
            onClick={() => { onFile(null); setError(""); }}
            className="w-6 h-6 rounded-md hover:bg-white/8 flex items-center justify-center text-[#4e5f72] hover:text-[#e8edf5] transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 flex flex-col items-center gap-3 transition-colors ${
            dragging
              ? "border-[#4f8ef7]/60 bg-[#4f8ef7]/8"
              : "border-white/10 hover:border-white/20 hover:bg-white/3"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <Upload size={18} className="text-[#7a8ba3]" />
          </div>
          <div className="text-center">
            <p className="text-sm text-[#e8edf5] font-medium">{description}</p>
            <p className="text-xs text-[#4e5f72] mt-1">Drag & drop or click to browse</p>
            <p className="text-[10px] font-mono text-[#2e3f52] mt-2 tracking-widest">PDF · DOCX · TXT · max {MAX_MB} MB</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={(e) => handle(e.target.files?.[0])}
          />
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-xs">
          <AlertCircle size={12} />
          {error}
        </div>
      )}
    </div>
  );
}
