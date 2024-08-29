import React, { useState } from "react";
import { calculateTimeDifference } from "../Firebase/BuenasPracticas"; // Importa la función de cálculo desde tu otro componente
import TipsCard from "./TipsCard";

const SegmentsList = ({ dataFromFirestore }) => {
  const uniqueProcesses = [
    ...new Set(dataFromFirestore.map((item) => item.proceso)),
  ];
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);

  const handleProcessClick = (proceso) => {
    setSelectedProcess(proceso);
    setSelectedSegment(null); // Reinicia el segmento seleccionado al cambiar el proceso
  };

  const handleSegmentClick = (segmento) => {
    setSelectedSegment(segmento);
  };

  const filteredDataByProcess = selectedProcess
    ? dataFromFirestore.filter((item) => item.proceso === selectedProcess)
    : dataFromFirestore;

  const uniqueSegments = [
    ...new Set(filteredDataByProcess.map((item) => item.segmento)),
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center">Buenas Prácticas</h2>

      {/* Filtro por proceso */}
      <ul className="list-group">
        {uniqueProcesses.map((proceso, index) => (
          <li
            key={index}
            className={`list-group-item list-group-item-info ${
              selectedProcess === proceso ? "active" : ""
            }`}
            onClick={() => handleProcessClick(proceso)}
            style={{ cursor: "pointer" }}
          >
            {proceso}
          </li>
        ))}
      </ul>

      {/* Filtro por segmento, solo visible si se seleccionó un proceso */}
      {selectedProcess && (
        <ul className="list-group mt-4">
          {uniqueSegments.map((segmento, index) => (
            <li
              key={index}
              className={`list-group-item list-group-item-info ${
                selectedSegment === segmento ? "active" : ""
              }`}
              onClick={() => handleSegmentClick(segmento)}
              style={{ cursor: "pointer" }}
            >
              {segmento}
            </li>
          ))}
        </ul>
      )}

      {/* Muestra las cards si hay un proceso y segmento seleccionados */}
      {selectedSegment && (
        <div className="mt-4">
          <h3 className="text-center mt-5">{selectedSegment}</h3>

          <div className="container d-flex flex-wrap justify-content-evenly card-group gap-3">
            {filteredDataByProcess
              .filter((item) => item.segmento === selectedSegment)
              .map((item, index) => (
                <TipsCard
                  key={index}
                  item={item}
                  calculateTimeDifference={calculateTimeDifference}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentsList;
