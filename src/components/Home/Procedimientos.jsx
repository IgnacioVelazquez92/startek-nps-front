import React, { useState } from "react";
import { calculateTimeDifference } from "../Firebase/BuenasPracticas";
import { Modal } from "react-bootstrap";
import "./TipsCard.css";

const Procedimientos = ({ pdfFromFirestore }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenPDFModal = (pdf) => {
    setModalIsOpen(true);
  };

  return (
    <>
      <h2 className="text-center mt-5">Procedimientos a Reforzar</h2>
      <div className="container my-3 px-5 d-flex justify-content-center gap-3 flex-wrap">
        {pdfFromFirestore.map((pdf) => (
          <div className="pdftips" key={pdf.id}>
            <div className="pdftips__titulo">{pdf.titulo}</div>
            <div className="tips__cuerpo">
              <div className="pdftips__body">
                <p className="tips__importancia">{pdf.descripcion}</p>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="btn-pdf"
                  onClick={() => handleOpenPDFModal(pdf)}
                >
                  Ver INFO
                </button>
              </div>
            </div>
            <div className="pdftips__footer">
              Agregado por {pdf.nombreLider} hace{" "}
              {calculateTimeDifference(pdf.fecha.toDate())}
            </div>
            <Modal
              show={modalIsOpen}
              fullscreen={true}
              onHide={() => setModalIsOpen(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>{pdf.titulo}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <iframe
                  src={pdf.archivoURL}
                  className="container-fluid vh-100"
                  frameborder="0"
                ></iframe>
              </Modal.Body>
            </Modal>
          </div>
        ))}
      </div>
    </>
  );
};

export default Procedimientos;
