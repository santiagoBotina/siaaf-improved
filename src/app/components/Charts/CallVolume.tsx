import { Phone } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { MetricCard } from "./MetricCard";
import { memo } from "react";

const Component = () => {
  const data = [
    { week: "Semana 1", calls: 800 },
    { week: "Semana 2", calls: 1200 },
    { week: "Semana 3", calls: 600 },
    { week: "Semana 4", calls: 1100 },
  ];

  return (
    <MetricCard
      title="Volumen de chats"
      value="1200 chats"
      subtitle="Últimos 30 días +15%"
      icon={Phone}
      trend="+15%"
    >
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <YAxis hide />
            <Line
              type="monotone"
              dataKey="calls"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </MetricCard>
  );
};

const CallVolumeChart = memo(Component);

export { CallVolumeChart };
