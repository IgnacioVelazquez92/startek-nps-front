import React, { useState } from "react";
import { calculateTimeDifference } from "../Firebase/BuenasPracticas"; // Importa la función de cálculo desde tu otro componente
import TipsCard from "./TipsCard";

const SegmentsList = ({ dataFromFirestore }) => {
  const uniqueSegments = [
    ...new Set(dataFromFirestore.map((item) => item.segmento)),
  ];
  const [selectedSegment, setSelectedSegment] = useState(null);

  const handleSegmentClick = (segmento) => {
    setSelectedSegment(segmento);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Buenas Practicas</h2>
      <ul className="list-group">
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

      {selectedSegment && (
        <div className="mt-4">
          <h3 className="text-center mt-5">{selectedSegment}</h3>

          <div className="container d-flex flex-wrap justify-content-evenly card-group gap-3">
            {dataFromFirestore
              .filter((item) => item.segmento === selectedSegment)
              .map((item) => (
                <TipsCard
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
