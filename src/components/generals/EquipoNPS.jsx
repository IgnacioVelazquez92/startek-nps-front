import React from "react";
import {
  agruparPor,
  calculoPilares,
  calculoResolucion,
  calcularNPS,
  filtrarYAgrupar,
} from "../../utils/utils";

const EquipoNPS = ({ encuestas, pivotKey, filters }) => {
  // Filtrar y agrupar las encuestas
  const encuestasFiltradas = filters
    ? filtrarYAgrupar(encuestas, filters, pivotKey)
    : agruparPor(encuestas, pivotKey);

  // Obtener las claves de los grupos filtrados y agrupados
  const grupos = Object.keys(encuestasFiltradas);

  // Variables para totales
  let totalEncuestas = 0;
  let totalPromotores = 0;
  let totalNeutros = 0;
  let totalDetractores = 0;
  let sumCordialidad = 0;
  let sumClaridad = 0;
  let sumConocimiento = 0;
  let sumResolucion = 0;

  // Calcular los valores de cada grupo y acumular para los totales
  const filas = grupos.map((grupo) => {
    const encuestasGrupo = encuestasFiltradas[grupo];
    const nps = calcularNPS(encuestasGrupo);
    const cordialidad = calculoPilares(encuestasGrupo, "Cordialidad");
    const claridad = calculoPilares(encuestasGrupo, "Claridad");
    const conocimiento = calculoPilares(encuestasGrupo, "Conocimiento");
    const resolucion = calculoResolucion(encuestasGrupo);

    // Acumular los totales
    totalEncuestas += nps.total;
    totalPromotores += nps.promotores;
    totalNeutros += nps.neutros;
    totalDetractores += nps.detractores;
    sumCordialidad += cordialidad;
    sumClaridad += claridad;
    sumConocimiento += conocimiento;
    sumResolucion += resolucion;

    return (
      <tr key={grupo}>
        <td>{grupo}</td>
        <td>{nps.total}</td>
        <td>{nps.promotores}</td>
        <td>{nps.neutros}</td>
        <td>{nps.detractores}</td>
        <td>{nps.nps}%</td>
        <td>{cordialidad}%</td>
        <td>{claridad}%</td>
        <td>{conocimiento}%</td>
        <td>{resolucion}%</td>
      </tr>
    );
  });

  // Calcular los totales generales
  const totalNPS =
    totalEncuestas > 0
      ? ((totalPromotores - totalDetractores) / totalEncuestas) * 100
      : 0;
  const totalCordialidad =
    grupos.length > 0 ? sumCordialidad / grupos.length : 0;
  const totalClaridad = grupos.length > 0 ? sumClaridad / grupos.length : 0;
  const totalConocimiento =
    grupos.length > 0 ? sumConocimiento / grupos.length : 0;
  const totalResolucion = grupos.length > 0 ? sumResolucion / grupos.length : 0;

  return (
    <div className="my-3 px-3">
      <h2>Equipo Coordinación</h2>
      <table className="table table-hover border-bottom border-dark">
        <thead>
          <tr>
            <th className="h4">{pivotKey}</th>
            <th className="h4">Total</th>
            <th>
              <i className="bi bi-emoji-smile text-success h4 fw-bold"></i>
            </th>
            <th>
              <i className="bi bi-emoji-neutral text-warning h4 fw-bold"></i>
            </th>
            <th>
              <i className="bi bi-emoji-angry text-danger h4 fw-bold"></i>
            </th>
            <th className="h4 fw-bold">NPS</th>
            <th className="h4 fw-bold">COR</th>
            <th className="h4 fw-bold">CLA</th>
            <th className="h4 fw-bold">CON</th>
            <th className="h4 fw-bold">RES</th>
          </tr>
        </thead>
        <tbody>
          {filas}
          <tr>
            <td>
              <strong>Totales</strong>
            </td>
            <td>
              <strong>{totalEncuestas}</strong>
            </td>
            <td>
              <strong>{totalPromotores}</strong>
            </td>
            <td>
              <strong>{totalNeutros}</strong>
            </td>
            <td>
              <strong>{totalDetractores}</strong>
            </td>
            <td>
              <strong>{totalNPS.toFixed(2)}%</strong>
            </td>
            <td>
              <strong>{totalCordialidad.toFixed(2)}%</strong>
            </td>
            <td>
              <strong>{totalClaridad.toFixed(2)}%</strong>
            </td>
            <td>
              <strong>{totalConocimiento.toFixed(2)}%</strong>
            </td>
            <td>
              <strong>{totalResolucion.toFixed(2)}%</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EquipoNPS;
