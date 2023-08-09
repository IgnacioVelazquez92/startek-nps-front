// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const LineChartDay = ({ data }) => {
//   console.log(data);

//   var midata = {
//     labels: data.map((d) => {
//       return d.fecha;
//     }),
//     datasets: [
//       // Cada una de las líneas del gráfico
//       {
//         label: "NPS",
//         data: data.map((d) => {
//           return d.nps;
//         }),
//         tension: 0.5,
//         fill: true,
//         borderColor: "rgb(255, 99, 132)",
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//         pointRadius: 5,
//         pointBorderColor: "rgba(255, 99, 132)",
//         pointBackgroundColor: "rgba(255, 99, 132)",
//       },
//     ],
//   };
//   var options = {
//     scales: {
//       y: {
//         min: -100,
//       },
//       x: {
//         ticks: { color: "rgb(255, 99, 132)" },
//       },
//     },
//   };

//   return <Line data={midata} options={options} />;
// };

// export default LineChartDay;

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
