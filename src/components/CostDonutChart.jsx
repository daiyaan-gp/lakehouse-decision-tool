import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { COMPONENT_COLORS } from './TimeToMarketChart';

ChartJS.register(ArcElement, Tooltip, Legend);

function shortenComponentName(name) {
  if (name === "Machine Learning Serving (Inference)") return "ML Serving";
  return name;
}

function CostDonutChart({ selectedData }) {
  const componentCosts = selectedData.reduce((acc, item) => {
    if (item && item.price > 0) {
      acc[shortenComponentName(item.component)] = item.price;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(componentCosts),
    datasets: [
      {
        data: Object.values(componentCosts),
        backgroundColor: Object.keys(componentCosts).map(comp => {
          const originalName = comp === "ML Serving" ? "Machine Learning Serving (Inference)" : comp;
          return COMPONENT_COLORS[originalName].bg;
        }),
        borderColor: Object.keys(componentCosts).map(comp => {
          const originalName = comp === "ML Serving" ? "Machine Learning Serving (Inference)" : comp;
          return COMPONENT_COLORS[originalName].border;
        }),
        borderWidth: 2,
        hoverOffset: 15
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 11
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'Monthly Cost Distribution',
        font: {
          size: 14
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `$${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CostDonutChart; 