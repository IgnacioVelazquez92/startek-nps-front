import React from "react";

import Accordion from "react-bootstrap/Accordion";

function Portada() {
  const tips = [
    {
      tipo: "success",
      img: "assets/svg/speech-mail.svg",
      title: "Speech encuesta",
      importancia:
        "Adapta tu enfoque al hablar con los clientes. Informa que tendrán una encuesta de NPS disponible 24 horas después de su llamada e incentiva la pronta respuesta para evitar mezclar experiencias. Personaliza el speech según su historial de encuestas o no encuestas. Verifica los correos, ya que errores impedirán la entrega de la misma. Tu compromiso asegura evaluaciones precisas y valiosas.",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },

    {
      tipo: "success",
      title: "Continuidad de servicio",
      img: "assets/svg/base-speech.svg",
      importancia:
        "Según nuestro estudio, más del 60% de las encuestas respondidas como promotoras de alguna u otra forma terminan culminando con la Carga de continuidad de servicio. Por lo tanto, es sumamente importante evitar automatizar este proceso y, en su lugar, esforzarnos siempre por ofrecer un nivel de contención diferenciado.",
      speech:
        "Ana, mientras aguardamos a que puedas volver a navegar correctamente, para que no te quedes sin servicio, lo que voy a hacer es cargarte en tu Personal un pack de 40 gigas para compartir con otros dispositivos y 10 gigas de uso libre que va a ser válido por 72 horas. La idea de este paquete de gigas es que puedas seguir conectado a internet desde todos los dispositivos de tu hogar. Sabes como compartir los datos? por que yo puedo guiarte paso a paso de cómo configurar tu teléfono celular como módem.",
    },

    {
      tipo: "danger",
      img: "assets/svg/agente-two-person.svg",
      title: "Speech encuesta",
      importancia:
        "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },
    {
      tipo: "danger",
      img: "assets/svg/agente-two-person.svg",
      title: "Speech encuesta",
      importancia:
        "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },
    {
      tipo: "danger",
      img: "assets/svg/agente-two-person.svg",
      title: "Speech encuesta",
      importancia:
        "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },
    {
      tipo: "danger",
      title: "Speech encuesta",
      img: "assets/svg/agente-two-person.svg",
      importancia:
        "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },
    {
      tipo: "danger",
      title: "Speech encuesta",
      img: "assets/svg/agente-two-person.svg",
      importancia:
        "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },

    // Puedes agregar más tips y speechs aquí
  ];

  return (
    <>
      <h2 className="my-3 text-center">Tips para mejorar tu eficacia</h2>
      <div className="container">
        <Accordion defaultActiveKey="0">
          {tips.map((tip, index) => {
            return (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{tip.title}</Accordion.Header>
                <Accordion.Body>
                  <div className="d-md-flex justify-content-center align-items-center gap-4">
                    <div className="col-md-3">
                      <img src={tip.img} alt="img" className="img-fluid" />
                    </div>
                    <div className="col-md-8">
                      <p>{tip.importancia}</p>
                      <hr />
                      Speech sugerido:
                      <p className="fst-italic">{tip.speech}</p>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </>
  );
}

export default Portada;
