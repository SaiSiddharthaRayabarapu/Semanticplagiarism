import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  return (
    <div className="bg-[#0f1e35] border border-white/10 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[11px] font-mono tracking-wider text-[#7a8ba3] mb-1">{label}</p>
      <p className="font-mono font-600 text-[#e8edf5]">{v}%</p>
    </div>
  );
}

export default function SimilarityChart({ sections }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={sections} barSize={28} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="name"
          tick={{ fill: "#4e5f72", fontSize: 11, fontFamily: "JetBrains Mono" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: "#4e5f72", fontSize: 10, fontFamily: "JetBrains Mono" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <ReferenceLine
          y={80}
          stroke="#f87171"
          strokeDasharray="4 4"
          strokeOpacity={0.5}
          label={{ value: "80% threshold", position: "right", fill: "#f87171", fontSize: 10, fontFamily: "JetBrains Mono" }}
        />
        <Bar dataKey="similarity" radius={[4, 4, 0, 0]}>
          {sections.map((s) => (
            <Cell
              key={s.name}
              fill={s.similarity >= 80 ? "#f87171" : s.similarity >= 50 ? "#fbbf24" : "#34d399"}
              fillOpacity={0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
