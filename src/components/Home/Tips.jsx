import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";

const Tips = () => {
  const tips = [
    {
      tipo: "success",
      title: "Speech encuesta",
      importancia:
        "Adapta tu enfoque al hablar con los clientes. Informa que tendrán una encuesta de NPS disponible 24 horas después de su llamada e incentiva la pronta respuesta para evitar mezclar experiencias. Personaliza el speech según su historial de encuestas o no encuestas. Verifica los correos, ya que errores impedirán la entrega de la misma. Tu compromiso asegura evaluaciones precisas y valiosas.",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },

    {
      tipo: "success",
      title: "Speech encuesta",
      importancia:
        "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },

    {
      tipo: "danger",
      title: "Speech encuesta",
      importancia:
        "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },
    {
      tipo: "danger",
      title: "Speech encuesta",
      importancia:
        "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },
    {
      tipo: "danger",
      title: "Speech encuesta",
      importancia:
        "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },
    {
      tipo: "danger",
      title: "Speech encuesta",
      importancia:
        "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },
    {
      tipo: "danger",
      title: "Speech encuesta",
      importancia:
        "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },

    // Puedes agregar más tips y speechs aquí
  ];

  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  //   return (
  //     <>
  //       <h3 className="my-3 text-center">En construcción</h3>
  //       <div className="container d-lg-flex gap-3">
  //         {tips.map((tip, index) => (
  //           <div key={index} className={`p-5 border rounded-5 bg-${tip.tipo}`}>
  //             <div className=" d-flex align-items-center">
  //               <h2 className="h5 p-2 text-light">{tip.title}</h2>

  //               <Button variant="light" onClick={handleShow}>
  //                 Ver más
  //               </Button>

  //               <Modal show={show} size={"lg"} onHide={handleClose}>
  //                 <Modal.Header closeButton>
  //                   <Modal.Title>{tip.title}</Modal.Title>
  //                 </Modal.Header>
  //                 <Modal.Body>
  //                   <h4>{tip.importancia}</h4>
  //                   <h5 className="text-center">ejemplo:</h5>
  //                   <p>"{tip.speech}"</p>
  //                 </Modal.Body>
  //                 <Modal.Footer></Modal.Footer>
  //               </Modal>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </>
  //   );
  // };

  // export default Tips;

  const [selectedTipIndex, setSelectedTipIndex] = useState(-1);

  const handleClose = () => setSelectedTipIndex(-1);
  const handleShow = (index) => setSelectedTipIndex(index);

  return (
    <>
      <div className="container d-lg-flex gap-3 my-3 flex-wrap">
        {tips.map((tip, index) => (
          <div key={index} className={`p-5 border rounded-5 bg-${tip.tipo}`}>
            <div className=" d-flex align-items-center">
              <h2 className="h5 p-2 text-light">{tip.title}</h2>
              <Button variant="light" onClick={() => handleShow(index)}>
                Ver más
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedTipIndex !== -1 && (
        <Modal show={true} onHide={handleClose} size={"lg"}>
          <Modal.Header closeButton>
            <Modal.Title>{tips[selectedTipIndex].title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="fst-italic">
            <h4>{tips[selectedTipIndex].importancia}</h4>
            <h5 className="text-center">ejemplo:</h5>
            <p>"{tips[selectedTipIndex].speech}"</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Tips;
