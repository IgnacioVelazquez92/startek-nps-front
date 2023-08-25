import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChartDay = ({ data }) => {
  // Ordenar los datos por fecha en orden ascendente
  const sortedData = data
    .slice()
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  var midata = {
    labels: sortedData.map((d) => {
      return d.fecha;
    }),
    datasets: [
      {
        label: "NPS",
        data: sortedData.map((d) => {
          return d.nps;
        }),
        tension: 0.5,
        fill: true,
        borderColor: "rgb(234,41,133)",
        backgroundColor: "rgb(234,41,133, .25)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
      },
      {
        label: "Q-Encuestas",
        data: sortedData.map((d) => {
          return d.totalRespuestas;
        }),
        tension: 0.5,
        fill: true,
        borderColor: "#2445FF",
        backgroundColor: "rgb(36, 69, 255, .25)",
        pointRadius: 5,
        pointBorderColor: "rgba(36, 69, 255)",
        pointBackgroundColor: "rgba(36, 69, 255)",
      },
    ],
  };

  var options = {
    scales: {
      x: {
        ticks: { color: "rgb(234,41,133)" },
      },
    },
  };

  return <Line data={midata} options={options} />;
};

export default LineChartDay;
