import React from "react";

const TablaAgentes = ({ encuestas }) => {
  const calcularTotalesYnps = (encuestas) => {
    const liderEncuestaCount = {};
    const liderPromotorCount = {};
    const liderPasivoCount = {};
    const liderDetractorCount = {};
    const liderNPS = {};

    encuestas.forEach((encuesta) => {
      const lider = encuesta.LIDER;

      if (
        encuesta.NPS_Calification >= 0 &&
        encuesta.NPS_Calification !== null
      ) {
        liderEncuestaCount[lider] = (liderEncuestaCount[lider] || 0) + 1;
      }

      if (encuesta.NPS_GROUP === "Pasivo") {
        liderPasivoCount[lider] = (liderPasivoCount[lider] || 0) + 1;
      } else if (encuesta.NPS_GROUP === "Detractor") {
        liderDetractorCount[lider] = (liderDetractorCount[lider] || 0) + 1;
      } else if (encuesta.NPS_GROUP === "Promotor") {
        liderPromotorCount[lider] = (liderPromotorCount[lider] || 0) + 1;
      }
    });

    for (const lider in liderEncuestaCount) {
      const promotores = liderPromotorCount[lider] || 0;
      const pasivos = liderPasivoCount[lider] || 0;
      const detractores = liderDetractorCount[lider] || 0;

      const nps =
        ((promotores - detractores) / liderEncuestaCount[lider]) * 100;

      liderNPS[lider] = {
        total: liderEncuestaCount[lider],
        promotores,
        pasivos,
        detractores,
        nps: nps.toFixed(2),
      };
    }

    return liderNPS;
  };

  const liderNPS = calcularTotalesYnps(encuestas);

  return (
    <div className="my-3 px-3">
      <h2>Equipo Coordinación</h2>
      <table className="table table-hover border-bottom border-dark ">
        <thead>
          <tr>
            <th className="h4">Líder</th>
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
            <th className="h4 fw-bold ">NPS</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(liderNPS).map((lider) => (
            <tr key={lider}>
              <td>{lider}</td>
              <td>{liderNPS[lider].total}</td>
              <td>{liderNPS[lider].promotores}</td>
              <td>{liderNPS[lider].pasivos}</td>
              <td>{liderNPS[lider].detractores}</td>
              <td>{liderNPS[lider].nps}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAgentes;
