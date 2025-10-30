import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Chart = () => {
  const data = [
    { name: "Income", value: 1200 },
    { name: "Expenses", value: 800 },
    { name: "Savings", value: 400 },
  ];

  const COLORS = ["#8b5cf6", "#ec4899", "#22c55e"];

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full">
      <h3 className="text-gray-700 font-semibold mb-4">Financial Overview</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Chart;
