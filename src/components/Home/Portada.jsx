import React from "react";
import Accordion from "react-bootstrap/Accordion";

function Portada() {
  const tips = [
    {
      tipo: "success",
      title: "Retención Customer/fija",
      img: "assets/svg/base-speech.svg",
      importancia:
        "¿Que buscamos a la hora de rebatir objeciones? Personalización: Se utiliza un lenguaje más cercano y se hace referencia a las necesidades específicas del cliente.\nÉnfasis en los beneficios: Se destacan los beneficios que el cliente obtendrá al aceptar la promoción (precio fijo, flexibilidad, tranquilidad).\nCreación de valor: Se muestra al cliente que la empresa está dispuesta a trabajar con él para encontrar una solución.\nLlamada a la acción clara: Se invita al cliente a aceptar la promoción y se le ofrece una solución concreta.",
      speech:
        "Sé específico: Menciona el descuento o el precio fijo exacto que estás ofreciendo.\nSé positivo: Mantén un tono de voz amable y entusiasta.\nSé claro: Explica de manera sencilla las condiciones de la promoción.\nSé paciente: Permite que el cliente reflexione sobre la oferta.\nSé persistente: Si el cliente muestra dudas, refuerza los beneficios y responde a sus objeciones.",
    },
    // Puedes agregar más tips y speechs aquí
  ];

  return (
    <>
      <h2 className="my-3 text-center">
        Tips para mejorar tu eficacia en Retención
      </h2>
      <div className="container">
        <Accordion defaultActiveKey="0">
          {tips.map((tip, index) => (
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header>{tip.title}</Accordion.Header>
              <Accordion.Body>
                <div className="d-md-flex justify-content-center align-items-center gap-4">
                  <div className="col-md-3">
                    <img src={tip.img} alt="img" className="img-fluid" />
                  </div>
                  <div className="col-md-8">
                    <p>{tip.importancia}</p>
                    <hr />
                    Como hacemos esto:
                    <p className="fst-italic">{tip.speech}</p>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </>
  );
}

export default Portada;
