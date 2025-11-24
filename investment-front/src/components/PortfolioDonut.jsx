import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = {
  달러: "#60A5FA",
  채권: "#FDE047",
  주식: "#4ADE80",
  금: "#FDBA74",
};

// Reusable 도넛 차트 컴포넌트 (기존 페이지 오염 없이 별도 사용 가능)
export default function PortfolioDonut({ data = {}, title = "추천 포트폴리오 구성" }) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
    fill: COLORS[name] || "#ccc",
  }));

  return (
    <div className="w-full h-80 bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
