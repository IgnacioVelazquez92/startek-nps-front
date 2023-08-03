import React from 'react';
import { Bar } from 'react-chartjs-2';

const NPSChart = ({ npsData }) => {
  // Obtener los datos y las etiquetas para el gráfico
  const scores = npsData.map((data) => data.score);
  const days = npsData.map((data) => data.day);

  // Configuración del gráfico
  const chartData = {
    labels: days,
    datasets: [
      {
        label: 'NPS por Día',
        data: scores,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
        suggestedMax: 10,
      },
    },
  };

  return (
    <div>
      <h2>Net Promoter Score por Día</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default NPSChart;
