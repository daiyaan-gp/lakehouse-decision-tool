import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TimeToMarketChart({ selectedData }) {
  const shortenComponentName = (name) => {
    if (name === "Machine Learning Serving (Inference)") return "ML Serving";
    return name;
  };

  const data = {
    labels: selectedData.map(row => shortenComponentName(row.component)),
    datasets: [
      {
        label: 'Time to Market (Days)',
        data: selectedData.map(row => row.timeToMarketDays),
        backgroundColor: [
          '#FF6384',  // Pink
          '#36A2EB',  // Blue
          '#FFCE56',  // Yellow
          '#4BC0C0',  // Teal
          '#9966FF',  // Purple
          '#FF9F40',  // Orange
          '#7CBA3B',  // Green
        ],
        borderRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} days`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Days',
          font: {
            size: 12
          }
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 11
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-[300px]">
      <h2 className="text-lg font-semibold mb-2">Time to Market by Component</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default TimeToMarketChart; 