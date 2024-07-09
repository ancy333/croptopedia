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

const SimpleChart = ({ data, selectedFeature }) => {
  const cropLabels = [...new Set(data.map(item => item.label))];

  const chartData = {
    labels: cropLabels,
    datasets: [
      {
        label: selectedFeature,
        data: cropLabels.map(label => {
          const values = data.filter(item => item.label === label).map(item => item[selectedFeature]);
          return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Crop'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: selectedFeature
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default SimpleChart;
