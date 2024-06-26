import React from "react";
import {
  agruparPor,
  calculoPilares,
  calculoResolucion,
  calcularNPS,
  filtrarYAgrupar,
} from "../../utils/utils";

const EquipoNPS = ({ encuestas, pivotKey, filters, title }) => {
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
  let sumMuySatisfechoCordialidad = 0;
  let sumBastanteSatisfechoCordialidad = 0;
  let sumNiSatNiInsatCordialidad = 0;
  let sumPocoSatisfechoCordialidad = 0;
  let sumNadaSatisfechoCordialidad = 0;
  let sumMuySatisfechoClaridad = 0;
  let sumBastanteSatisfechoClaridad = 0;
  let sumNiSatNiInsatClaridad = 0;
  let sumPocoSatisfechoClaridad = 0;
  let sumNadaSatisfechoClaridad = 0;
  let sumMuySatisfechoConocimiento = 0;
  let sumBastanteSatisfechoConocimiento = 0;
  let sumNiSatNiInsatConocimiento = 0;
  let sumPocoSatisfechoConocimiento = 0;
  let sumNadaSatisfechoConocimiento = 0;
  let sumResolucion = 0;

  // Calcular los valores de cada grupo y acumular para los totales
  const filas = grupos.map((grupo) => {
    const encuestasGrupo = encuestasFiltradas[grupo];
    const nps = calcularNPS(encuestasGrupo);
    const cordialidad = calculoPilares(encuestasGrupo, "Cordialidad");
    const claridad = calculoPilares(encuestasGrupo, "Claridad");
    const conocimiento = calculoPilares(encuestasGrupo, "Conocimiento");
    const resolucion = calculoResolucion(encuestasGrupo).metricaPilar;

    // Acumular los totales
    totalEncuestas += nps.total;
    totalPromotores += nps.promotores;
    totalNeutros += nps.neutros;
    totalDetractores += nps.detractores;
    sumMuySatisfechoCordialidad += cordialidad.muySatisfecho;
    sumBastanteSatisfechoCordialidad += cordialidad.bastanteSatisfecho;
    sumNiSatNiInsatCordialidad += cordialidad.niSatNiInsat;
    sumPocoSatisfechoCordialidad += cordialidad.pocoSatisfecho;
    sumNadaSatisfechoCordialidad += cordialidad.nadaSatisfecho;
    sumMuySatisfechoClaridad += claridad.muySatisfecho;
    sumBastanteSatisfechoClaridad += claridad.bastanteSatisfecho;
    sumNiSatNiInsatClaridad += claridad.niSatNiInsat;
    sumPocoSatisfechoClaridad += claridad.pocoSatisfecho;
    sumNadaSatisfechoClaridad += claridad.nadaSatisfecho;
    sumMuySatisfechoConocimiento += conocimiento.muySatisfecho;
    sumBastanteSatisfechoConocimiento += conocimiento.bastanteSatisfecho;
    sumNiSatNiInsatConocimiento += conocimiento.niSatNiInsat;
    sumPocoSatisfechoConocimiento += conocimiento.pocoSatisfecho;
    sumNadaSatisfechoConocimiento += conocimiento.nadaSatisfecho;
    sumResolucion += parseFloat(resolucion);

    return (
      <tr key={grupo}>
        <td>{grupo}</td>
        <td>{nps.total}</td>
        <td>{nps.promotores}</td>
        <td>{nps.neutros}</td>
        <td>{nps.detractores}</td>
        <td>{nps.nps}%</td>
        <td>{cordialidad.metricaPilar}%</td>
        <td>{claridad.metricaPilar}%</td>
        <td>{conocimiento.metricaPilar}%</td>
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
    totalEncuestas > 0
      ? ((sumMuySatisfechoCordialidad + sumBastanteSatisfechoCordialidad) /
          (sumMuySatisfechoCordialidad +
            sumBastanteSatisfechoCordialidad +
            sumNiSatNiInsatCordialidad +
            sumPocoSatisfechoCordialidad +
            sumNadaSatisfechoCordialidad)) *
        100
      : 0;
  const totalClaridad =
    totalEncuestas > 0
      ? ((sumMuySatisfechoClaridad + sumBastanteSatisfechoClaridad) /
          (sumMuySatisfechoClaridad +
            sumBastanteSatisfechoClaridad +
            sumNiSatNiInsatClaridad +
            sumPocoSatisfechoClaridad +
            sumNadaSatisfechoClaridad)) *
        100
      : 0;
  const totalConocimiento =
    totalEncuestas > 0
      ? ((sumMuySatisfechoConocimiento + sumBastanteSatisfechoConocimiento) /
          (sumMuySatisfechoConocimiento +
            sumBastanteSatisfechoConocimiento +
            sumNiSatNiInsatConocimiento +
            sumPocoSatisfechoConocimiento +
            sumNadaSatisfechoConocimiento)) *
        100
      : 0;
  const totalResolucion = grupos.length > 0 ? sumResolucion / grupos.length : 0;

  return (
    <div className="my-3 px-3">
      <h2>{title}</h2>
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
