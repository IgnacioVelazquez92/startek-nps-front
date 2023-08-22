import React, { useState, useEffect } from "react";

const TablaAgentes = ({ encuestas }) => {
  const calcularTotalesYnps = (encuestas) => {
    const agenteEncuestaCount = {};
    const agentePromotorCount = {};
    const agentePasivoCount = {};
    const agenteDetractorCount = {};
    const agenteNPS = {};

    encuestas.forEach((encuesta) => {
      const agente = encuesta.RAC;

      agenteEncuestaCount[agente] = (agenteEncuestaCount[agente] || 0) + 1;

      if (encuesta.NPS_GROUP === "Pasivo") {
        agentePasivoCount[agente] = (agentePasivoCount[agente] || 0) + 1;
      } else if (encuesta.NPS_GROUP === "Detractor") {
        agenteDetractorCount[agente] = (agenteDetractorCount[agente] || 0) + 1;
      } else {
        agentePromotorCount[agente] = (agentePromotorCount[agente] || 0) + 1;
      }
    });

    for (const agente in agenteEncuestaCount) {
      const promotores = agentePromotorCount[agente] || 0;
      const pasivos = agentePasivoCount[agente] || 0;
      const detractores = agenteDetractorCount[agente] || 0;
      const neutros =
        agenteEncuestaCount[agente] - promotores - pasivos - detractores;
      const nps =
        ((promotores - detractores) / agenteEncuestaCount[agente]) * 100;

      agenteNPS[agente] = {
        total: agenteEncuestaCount[agente],
        promotores,
        pasivos,
        neutros,
        detractores,
        nps: nps.toFixed(2), // Redondear a 2 decimales
      };
    }

    return agenteNPS;
  };

  const agenteNPS = calcularTotalesYnps(encuestas);

  return (
    <div className="my-3">
      <h2>Equipo</h2>
      <table className="table table-hover border-bottom border-dark">
        <thead>
          <tr>
            <th className="h4">Agente</th>
            <th className="h4">Total</th>
            <th>
              <i className="bi bi-emoji-smile h4 fw-bold"></i>
            </th>
            <th>
              <i className="bi bi-emoji-neutral h4 fw-bold"></i>
            </th>

            <th>
              <i className="bi bi-emoji-expressionless h4 fw-bold"></i>
            </th>
            <th className="h4 fw-bold">NPS</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(agenteNPS).map((agente) => (
            <tr key={agente}>
              <td>{agente}</td>
              <td>{agenteNPS[agente].total}</td>
              <td>{agenteNPS[agente].promotores}</td>
              <td>{agenteNPS[agente].pasivos}</td>
              <td>{agenteNPS[agente].detractores}</td>
              <td>{agenteNPS[agente].nps}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAgentes;