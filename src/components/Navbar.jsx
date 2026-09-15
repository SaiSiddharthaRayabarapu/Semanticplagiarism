import { NavLink, useNavigate } from "react-router-dom";
import { Shield, Plus } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Overview" },
  { to: "/sections", label: "Sections" },
  { to: "/evidence", label: "Evidence" },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/7 bg-[#050c1a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#4f8ef7]/15 border border-[#4f8ef7]/30 flex items-center justify-center">
            <Shield size={14} className="text-[#4f8ef7]" />
          </div>
          <span className="font-display font-600 text-[15px] text-[#e8edf5] tracking-tight">SemanticGuard</span>
          <span className="hidden sm:inline text-[10px] font-mono text-[#4f8ef7] bg-[#4f8ef7]/10 border border-[#4f8ef7]/20 px-2 py-0.5 rounded-full tracking-wider">DEMO</span>
        </div>

        <nav className="flex items-center gap-0.5">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                  isActive
                    ? "text-[#e8edf5] bg-white/8"
                    : "text-[#7a8ba3] hover:text-[#e8edf5] hover:bg-white/5"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#4f8ef7] text-white text-[13px] font-medium hover:bg-[#3a7ae0] transition-colors"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">New Analysis</span>
        </button>
      </div>
    </header>
  );
}
