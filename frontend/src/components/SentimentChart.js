import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SentimentChart.css';

const COLORS = {
  Bullish: '#00D68F',
  Bearish: '#FF4D6A',
  Neutral: '#FFB830',
};

function SentimentChart({ data }) {
  return (
    <div className="chart-card">
      <h3 className="chart-title">Sentiment Breakdown</h3>
      <p className="chart-subtitle">Distribution across all analysed articles</p>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#1A2236',
                border: '1px solid #1E2D45',
                borderRadius: '10px',
                color: '#F0F4FF',
                fontSize: '13px',
              }}
              formatter={(value) => [`${value}%`, '']}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                fontSize: '13px',
                color: '#8B9CC8',
                paddingTop: '16px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SentimentChart;