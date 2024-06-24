import { useState, useEffect } from "react";
import {
  calcularNPS,
  calculoPilares,
  calculoResolucion,
} from "../../utils/utils";

const TablaNps = ({ encuestas }) => {
  const [metricas, setMetricas] = useState({
    promotores: 0,
    detractores: 0,
    neutros: 0,
    nps: "S/D",
    Cordialidad: "S/D",
    Claridad: "S/D",
    Conocimiento: "S/D",
    Resolucion: "S/D",
  });

  useEffect(() => {
    if (encuestas.length > 0) {
      const npsResults = calcularNPS(encuestas);
      const cordialidad = calculoPilares(encuestas, "Cordialidad");
      const claridad = calculoPilares(encuestas, "Claridad");
      const conocimiento = calculoPilares(encuestas, "Conocimiento");
      const resolucion = calculoResolucion(encuestas);

      setMetricas({
        promotores: npsResults.promotores,
        detractores: npsResults.detractores,
        neutros: npsResults.neutros,
        nps: npsResults.nps,
        Cordialidad: cordialidad,
        Claridad: claridad,
        Conocimiento: conocimiento,
        Resolucion: resolucion,
      });
    }
  }, [encuestas]);

  return (
    <>
      <h3 className="text-center">Resultados:</h3>
      <div className="d-lg-flex justify-content-evenly container gap-3">
        <table className="table table-hover my-3 responsive container table-bordered ">
          <tbody>
            <tr className="table-success">
              <th scope="row">Promotores</th>
              <td>{metricas.promotores}</td>
            </tr>

            <tr className="table-danger">
              <th scope="row">Detractores</th>
              <td>{metricas.detractores}</td>
            </tr>

            <tr className="table-warning">
              <th scope="row">Neutros</th>
              <td>{metricas.neutros}</td>
            </tr>

            <tr className="table-light">
              <th scope="row">Total de respuestas:</th>
              <td>
                {metricas.promotores + metricas.detractores + metricas.neutros}
              </td>
            </tr>
            <tr className="table-info">
              <th scope="row">NPS</th>
              <td>{isNaN(metricas.nps) ? "S/D" : `${metricas.nps}%`}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-hover my-3 responsive container table-bordered table-striped table-success">
          <tbody>
            <tr>
              <th scope="row">Cordialidad</th>
              <td>
                {isNaN(metricas.Cordialidad)
                  ? "S/D"
                  : `${metricas.Cordialidad}%`}
              </td>
            </tr>

            <tr>
              <th scope="row">Claridad</th>
              <td>
                {isNaN(metricas.Claridad) ? "S/D" : `${metricas.Claridad}%`}
              </td>
            </tr>

            <tr>
              <th scope="row">Conocimiento</th>
              <td>
                {isNaN(metricas.Conocimiento)
                  ? "S/D"
                  : `${metricas.Conocimiento}%`}
              </td>
            </tr>

            <tr>
              <th scope="row">Resolucion</th>
              <td>
                {isNaN(metricas.Resolucion) ? "S/D" : `${metricas.Resolucion}%`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablaNps;
