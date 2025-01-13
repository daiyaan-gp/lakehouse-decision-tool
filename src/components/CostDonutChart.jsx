import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function CostDonutChart({ selectedData }) {
  const shortenComponentName = (name) => {
    if (name === "Machine Learning Serving (Inference)") return "ML Serving";
    return name;
  };

  const componentCosts = selectedData.map(row => ({
    component: shortenComponentName(row.component),
    price: row.price || 0
  }));

  const data = {
    labels: componentCosts.map(item => item.component),
    datasets: [
      {
        data: componentCosts.map(item => item.price),
        backgroundColor: [
          '#FF6384',  // Pink
          '#36A2EB',  // Blue
          '#FFCE56',  // Yellow
          '#4BC0C0',  // Teal
          '#9966FF',  // Purple
          '#FF9F40',  // Orange
          '#7CBA3B',  // Green
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%',
    maintainAspectRatio: false
  };

  return (
    <div className="w-full h-[300px]">
      <h2 className="text-lg font-semibold mb-2">Monthly Cost Distribution</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CostDonutChart; 