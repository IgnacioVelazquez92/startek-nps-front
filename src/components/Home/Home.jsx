import React, { useEffect, useState } from "react";
import Carrusel from "./Carrusel";
import Portada from "./Portada";
import SegmentsList from "./SegmentsList";
import Procedimientos from "./Procedimientos";
import {
  fetchDataFromFirestore,
  fetchPdfFromFirestore,
} from "../Firebase/configFirebase";

const Home = () => {
  const [dataFromFirestore, setDataFromFirestore] = useState([]);
  const [pdfFromFirestore, setPdfFromFirestore] = useState([]);

  useEffect(() => {
    // Llama a fetchDataFromFirestore para obtener los datos
    fetchDataFromFirestore()
      .then((data) => {
        setDataFromFirestore(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de Firestore: ", error);
      });

    // Llama a fetchPdfFromFirestore para obtener los PDFs
    fetchPdfFromFirestore()
      .then((pdfs) => {
        setPdfFromFirestore(pdfs);
      })
      .catch((error) => {
        console.error("Error al obtener PDFs de Firestore: ", error);
      });
  }, []);

  return (
    <>
      <Carrusel />
      <Portada />
      <SegmentsList dataFromFirestore={dataFromFirestore} />
    </>
  );
};

export default Home;
