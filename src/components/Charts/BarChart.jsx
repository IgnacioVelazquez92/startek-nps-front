// import React, { useEffect } from 'react';
// import Chart from 'chart.js/auto';

// const BarChart = ({data}) => {
//   useEffect(() => {
//     const chartData = {
//       labels: ['Promotores', 'Detractores', 'Neutros'],
//       datasets: [
//         {
//           label: 'NPS Scores',
//           data: [promoters, detractors, neutrals],
//           backgroundColor: ['#4CAF50', '#F44336', '#FFC107'], // Colores para las barras
//           borderColor: '#fff',
//           borderWidth: 1,
//         },
//       ],
//     };

//     new Chart(
//       document.getElementById('acquisitions'),
//       {
//         type: 'bar',
//         data: chartData,
//       }
//     );
//   }, [promoters, detractors, neutrals]);

//   return (
//     <canvas id='acquisitions' className='container'></canvas>
//   );
// };

// export default BarChart;
