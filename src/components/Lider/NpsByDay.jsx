import React from "react";
import LineChartDay from "../Charts/LineChartDay";

const NpsByDay = ({ encuestas }) => {
  const calculateNPSByDay = () => {
    // Agrupar las encuestas por día
    const groupedEncuestas = encuestas.reduce((result, encuesta) => {
      const fecha = new Date(encuesta.Fecha).toISOString().slice(0, 10); // Extraer solo la parte de la fecha (sin la hora)
      if (!result[fecha]) {
        result[fecha] = [];
      }
      result[fecha].push(encuesta);
      return result;
    }, {});

    // Calcular el NPS para cada día y guardar el resultado en un array
    const npsPorDia = [];
    for (const fecha in groupedEncuestas) {
      const promotores = groupedEncuestas[fecha].filter(
        (encuesta) => encuesta.NPS_Calification >= 9
      ).length;
      const detractores = groupedEncuestas[fecha].filter(
        (encuesta) => encuesta.NPS_Calification <= 6
      ).length;
      const totalRespuestas = groupedEncuestas[fecha].length;
      const nps = ((promotores - detractores) / totalRespuestas) * 100;
      npsPorDia.push({ fecha, nps });
    }

    return npsPorDia;
  };
  return (
    <div>
      {encuestas && (
        <div className="d-flex row justify-content-center px-0 mx-0">
          <div className="px-0 col-11 mx-0">
            <LineChartDay data={calculateNPSByDay()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NpsByDay;
