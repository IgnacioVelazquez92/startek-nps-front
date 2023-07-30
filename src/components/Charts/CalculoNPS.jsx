import React, { useState, useEffect } from 'react';
import {ApiClient} from '../../api/services'; // Asegúrate de importar la clase adecuada


const CalculoNPS = () => {
  const [npsData, setNpsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiClient = new ApiClient();
        const encuestas = await apiClient.getAll();

        // Crear un objeto para almacenar los datos del NPS por mes
        const npsByMonth = {};

        encuestas.forEach((encuesta) => {
          const nps = encuesta["2_NPS_GROUP"];
          const fechaInicio = new Date(encuesta["Metadatos de la encuesta - Fecha de inicio (+00:00 GMT)"]);
          const mes = fechaInicio.getMonth();
          const year = fechaInicio.getFullYear();

          const key = `${year}-${mes}`; // Utilizamos el formato 'YYYY-MM' como clave para cada mes

          if (!npsByMonth[key]) {
            // Si es la primera encuesta del mes, inicializamos los valores
            npsByMonth[key] = {
              promotores: 0,
              detractores: 0,
              neutros: 0,
            };
          }

          // Incrementamos el contador correspondiente según la categoría NPS
          if (nps === "Promotor") {
            npsByMonth[key].promotores++;
          } else if (nps === "Detractor") {
            npsByMonth[key].detractores++;
          } else if (nps === "Neutro") {
            npsByMonth[key].neutros++;
          }
          //  else{
          //   //no hay nada
          //   console.log("vacio");
          // }
        });

        setNpsData(npsByMonth);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Función para calcular el NPS
  const calculateNPS = (promotores, detractores, neutros) => {
    const totalResponses = promotores + detractores + neutros;
    const nps = ((promotores - detractores) / totalResponses) * 100;
    return nps;
  };

  return (
    <div>
      <p>Hola mundo</p>
      {Object.keys(npsData).map((month) => {
        const { promotores, detractores, neutros } = npsData[month];
        const [year, monthNum] = month.split('-');
        const nps = calculateNPS(promotores, detractores, neutros).toFixed(2);
        return (
          <div key={month}>
            <p>Year: {year}</p>
            <p>Month: {monthNum}</p>
            <p>Promotores: {promotores}</p>
            <p>Detractores: {detractores}</p>
            <p>Neutros: {neutros}</p>
            <p>NPS: {nps}%</p>
          </div>
        );
      })}
    </div>
  );
};

export default CalculoNPS;
