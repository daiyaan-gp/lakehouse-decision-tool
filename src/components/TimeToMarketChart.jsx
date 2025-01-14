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

// Shared color scheme for components
export const COMPONENT_COLORS = {
  "Data Storage": { bg: 'rgba(0, 99, 255, 0.9)', border: 'rgb(0, 99, 255)' },             // Royal Blue
  "Data Ingestion": { bg: 'rgba(255, 69, 0, 0.9)', border: 'rgb(255, 69, 0)' },           // Orange Red
  "Data Processing": { bg: 'rgba(147, 0, 255, 0.9)', border: 'rgb(147, 0, 255)' },        // Electric Purple
  "ML Training": { bg: 'rgba(0, 184, 92, 0.9)', border: 'rgb(0, 184, 92)' },              // Emerald Green
  "Machine Learning Serving (Inference)": { bg: 'rgba(255, 186, 0, 0.9)', border: 'rgb(255, 186, 0)' }, // Golden Yellow
  "Exploratory Data Analysis": { bg: 'rgba(255, 0, 110, 0.9)', border: 'rgb(255, 0, 110)' }, // Hot Pink
  "Dashboards / BI": { bg: 'rgba(0, 199, 255, 0.9)', border: 'rgb(0, 199, 255)' }         // Cyan
};

function shortenComponentName(name) {
  if (name === "Machine Learning Serving (Inference)") return "ML Serving";
  return name;
}

function TimeToMarketChart({ selectedData }) {
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Time to Market (Days)',
        font: {
          size: 14
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.x} days`
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return shortenComponentName(this.getLabelForValue(value));
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Days',
          font: {
            size: 12
          }
        }
      }
    }
  };

  const data = {
    labels: selectedData.map(item => item.component),
    datasets: [
      {
        data: selectedData.map(item => item.timeToMarketDays),
        backgroundColor: selectedData.map(item => COMPONENT_COLORS[item.component].bg),
        borderColor: selectedData.map(item => COMPONENT_COLORS[item.component].border),
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar options={options} data={data} />
    </div>
  );
}

export default TimeToMarketChart; 