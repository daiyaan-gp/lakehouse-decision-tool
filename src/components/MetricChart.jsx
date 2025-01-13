// src/components/MetricChart.jsx
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function MetricChart({ aggregatedMetrics }) {
  const data = {
    labels: ['Cost', 'Time to Market', 'Complexity'],
    datasets: [
      {
        label: 'Lakehouse Metrics',
        data: [
          aggregatedMetrics.cost,
          aggregatedMetrics.timeToMarket,
          aggregatedMetrics.complexity
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',  // Light blue fill
        borderColor: 'rgba(54, 162, 235, 1)',        // Blue border
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 21 
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={{ height: '400px', width: '400px' }}>
      <Radar data={data} options={options} />
    </div>
  );
}

export default MetricChart;
