import React, { useState } from "react";
import { calculateTimeDifference } from "../Firebase/BuenasPracticas";
import { Modal } from "react-bootstrap";

const Procedimientos = ({ pdfFromFirestore }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handleOpenPDFModal = (pdf) => {
    setSelectedPdf(pdf);
    setModalIsOpen(true);
  };

  return (
    <>
      <h2 className="text-center mt-5">Procedimientos a Reforzar</h2>
      <div className="container my-3 px-5 d-flex gap-3 flex-wrap">
        {pdfFromFirestore.map((pdf) => (
          <div className="col-sm-4 mb-3 mb-sm-0" key={pdf.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"> {pdf.titulo}</h5>
                <p className="card-text h6">{pdf.descripcion}</p>
                <div className="d-flex justify-content-evenly">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleOpenPDFModal(pdf)}
                  >
                    Ver PDF
                  </button>
                </div>
              </div>
              <div className="card-footer h6">
                Agregado por {pdf.nombreLider} hace{" "}
                {calculateTimeDifference(pdf.fecha.toDate())}
              </div>
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
