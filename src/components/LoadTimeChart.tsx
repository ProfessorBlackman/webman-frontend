import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LoadTimeChartProps {
  loadTime: number;
}

export const LoadTimeChart: React.FC<LoadTimeChartProps> = ({ loadTime }) => {
  // Generate comparative data
  const chartData = [
    { name: 'Your Site', time: loadTime },
    { name: 'Industry Average', time: 2.5 }, // Hypothetical industry average
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Load Time Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line type="monotone" dataKey="time" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};