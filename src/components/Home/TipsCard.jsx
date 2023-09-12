import React from "react";
import "./TipsCard.css";

const TipsCard = ({ item, calculateTimeDifference }) => {
  return (
    <div className="tips" key={item.id}>
      <div className="tips__titulo">{item.titulo}</div>
      <div className="tips__cuerpo">
        <div className="tips__body">
          <p className="tips__importancia">{item.importancia}</p>
          <p className="tips__speech">{item.tips}</p>
        </div>
        <div className="tips__contenedor">
          <div className="tips__agente">
            <img src="/agente.svg" alt="agente" />
            <span className="tips__span">{item.nombreAgente}</span>
          </div>
          <div className="tips__audio">
            <audio controls>
              <source src={item.archivoURL} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        </div>
      </div>
      <div className="tips__footer">
        {item.nombre
          ? `
        Agregado por ${item.nombreLider} hace ${" "}
        ${calculateTimeDifference(item.fecha.toDate())}`
          : "Cargado hace un instante"}
      </div>
    </div>
  );
};

export default TipsCard;
