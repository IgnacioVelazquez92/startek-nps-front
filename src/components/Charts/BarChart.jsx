import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';


const BarChart = ({ npsData }) => {


  console.log(npsData);
 

  return (
    <div>
      <h2>Net Promoter Score por Día</h2>
    </div>
  );
};

export default BarChart;
