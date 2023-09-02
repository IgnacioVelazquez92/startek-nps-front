import React, { useState } from "react";
import { calculateTimeDifference } from "../Firebase/BuenasPracticas"; // Importa la función de cálculo desde tu otro componente

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

          <div className="container">
            {dataFromFirestore
              .filter((item) => item.segmento === selectedSegment)
              .map((item) => (
                <div className="card text-center my-2" key={item.id}>
                  <div className="card-header ">{item.titulo}</div>
                  <div className="card-body">
                    <h5 className="card-title h5 lh-1">{item.importancia}</h5>
                    <p className="card-text fst-italic my-3">{item.tips}</p>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="d-flex justify-content-center flex-column align-items-center me-4">
                        <i className="bi bi-headset h3 my-0"></i>
                        <span className="text-body-secondary">
                          {item.nombreAgente}
                        </span>
                      </div>

                      <audio controls>
                        <source src={item.archivoURL} type="audio/mp3" />
                        Tu navegador no soporta el elemento de audio.
                      </audio>
                    </div>
                  </div>
                  <div className="card-footer text-body-secondary">
                    {" "}
                    {item.nombreLider} hace{" "}
                    {calculateTimeDifference(item.fecha.toDate())}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentsList;
