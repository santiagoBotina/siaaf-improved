import { Clock } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { memo } from "react";
import { MetricCard } from "@/app/components/Charts/MetricCard";

const Component = () => {
  const data = [
    { range: "0-2\nmin", value: 20, color: "#E5E7EB" },
    { range: "2-5\nmin", value: 35, color: "#9CA3AF" },
    { range: "5-10\nmin", value: 80, color: "#6B7280" },
    { range: "10+\nmin", value: 45, color: "#374151" },
  ];

  return (
    <MetricCard
      title="Distribución de duración de interacciones"
      value="Promedio: 5 min"
      subtitle="Últimos 30 días +5%"
      icon={Clock}
    >
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="range"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6B7280" }}
            />
            <YAxis hide />
            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </MetricCard>
  );
};

const CallDurationChart = memo(Component);

export { CallDurationChart };
