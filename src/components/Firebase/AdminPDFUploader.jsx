import React, { useState, useContext, useEffect } from "react";
import {
  uploadPDF,
  savePdfDataToFirestore,
  fetchPdfFromFirestore,
  deletePdfFromFirestore,
} from "./configFirebase";
import { serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import UserContext from "../../context/userContext";
import { calculateTimeDifference } from "./BuenasPracticas";
import { Modal } from "react-bootstrap";

function AdminPDFUploader() {
  const [pdfName, setPDFName] = useState("");
  const [pdfDescription, setPDFDescription] = useState("");
  const [pdfFile, setPDFFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState([]); // Estado para almacenar la lista de PDFs
  const { user } = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    // Cargar la lista de PDFs al cargar el componente
    loadPDFs();
  }, []);

  const loadPDFs = async () => {
    try {
      const pdfList = await fetchPdfFromFirestore();
      setPdfs(pdfList);
    } catch (error) {
      console.error("Error loading PDFs: ", error);
    }
  };

  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    setPDFFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (pdfName && pdfFile) {
      try {
        const downloadURL = await uploadPDF(pdfFile);

        const data = {
          titulo: pdfName,
          descripcion: pdfDescription,
          archivoURL: downloadURL,
          nombreLider: user.name,
          fecha: serverTimestamp(),
        };
        await savePdfDataToFirestore(data);
        Swal.fire({
          icon: "success",
          title: "Realizado",
          text: "Se cargó con éxito",
        });

        // Recargar la lista de PDFs
        loadPDFs();
      } catch (error) {
        console.error("Error uploading file: ", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      } finally {
        setLoading(false);
        setPDFName("");
        setPDFDescription("");
        setPDFFile(null);
      }
    }
  };

  const handleDeletePDF = async (pdfId) => {
    try {
      await deletePdfFromFirestore(pdfId);
      // Recargar la lista de PDFs después de eliminar uno
      loadPDFs();
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Registro eliminado correctamente.",
      });
    } catch (error) {
      console.error("Error deleting PDF: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al eliminar el registro.",
      });
    }
  };

  const handleOpenPDFModal = (pdf) => {
    setSelectedPdf(pdf);
    setModalIsOpen(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Subir Procedimiento en Formato PDF</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="pdfName" className="form-label">
            Título:
          </label>
          <input
            type="text"
            id="pdfName"
            className="form-control"
            value={pdfName}
            onChange={(e) => setPDFName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pdfDescription" className="form-label">
            Descripción:
          </label>
          <textarea
            id="pdfDescription"
            className="form-control"
            value={pdfDescription}
            onChange={(e) => setPDFDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="pdfFile" className="form-label">
            Archivo PDF:
          </label>
          <input
            type="file"
            id="pdfFile"
            className="form-control"
            accept=".pdf"
            onChange={handlePDFUpload}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar PDF
        </button>
        {loading && <Loader className="mx-auto" />}
      </form>

      <h2 className="mt-4">Lista de procedimientos cargados:</h2>
      {pdfs.length === 0 ? (
        <p>No hay PDFs cargados.</p>
      ) : (
        <div className="container my-3 px-5 d-flex gap-3 flex-wrap">
          {pdfs.map((pdf) => (
            <div className="pdftips" key={pdf.id}>
              <div className="pdftips__titulo">{pdf.titulo}</div>
              <div className="tips__cuerpo">
                <div className="pdftips__body">
                  <p className="tips__importancia">{pdf.descripcion}</p>
                </div>

                <div className="d-flex justify-content-evenly mt-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeletePDF(pdf.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleOpenPDFModal(pdf)}
                  >
                    Ver PDF
                  </button>
                </div>
              </div>
              <div className="pdftips__footer">
                {pdf.fecha
                  ? `Agregado por ${
                      pdf.nombreLider
                    } hace ${calculateTimeDifference(pdf.fecha.toDate())}`
                  : "Cargado un instante"}
              </div>
              <Modal
                show={modalIsOpen}
                size={"xxl"}
                onHide={() => setModalIsOpen(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Vista Previa de PDF</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <iframe
                    src={pdf.archivoURL}
                    className="container-fluid"
                    frameborder="0"
                  ></iframe>
                </Modal.Body>
              </Modal>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPDFUploader;
