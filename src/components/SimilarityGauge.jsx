import { PieChart, Pie, Cell } from "recharts";

export default function SimilarityGauge({ value }) {
  const remaining = 100 - value;
  const data = [{ v: value }, { v: remaining }];

  const color =
    value >= 80 ? "#f87171" :
    value >= 50 ? "#fbbf24" :
    "#34d399";

  return (
    <div className="relative flex items-center justify-center w-44 h-44">
      <PieChart width={176} height={176}>
        <Pie
          data={data}
          cx={88}
          cy={88}
          startAngle={225}
          endAngle={-45}
          innerRadius={60}
          outerRadius={78}
          dataKey="v"
          strokeWidth={0}
          paddingAngle={2}
        >
          <Cell fill={color} />
          <Cell fill="rgba(255,255,255,0.05)" />
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-700 text-3xl" style={{ color }}>{value}%</span>
        <span className="text-[10px] font-mono tracking-widest text-[#4e5f72] uppercase mt-0.5">similarity</span>
      </div>
    </div>
  );
}
