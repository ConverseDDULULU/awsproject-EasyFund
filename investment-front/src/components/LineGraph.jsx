import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 단순 선 그래프 컴포넌트 (데이터 미존재 시에도 안전)
export default function LineGraph({ data = [], color = "#3B82F6", dataKey = "value" }) {
  return (
    <div className="w-full h-64 bg-white rounded-xl shadow p-4">
      {data.length === 0 ? (
        <p className="text-sm text-gray-500">데이터가 없습니다.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
