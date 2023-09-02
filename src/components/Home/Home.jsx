import React, { useEffect, useState } from "react";
import Carrusel from "./Carrusel";
import Portada from "./Portada";
import SegmentsList from "./SegmentsList";
import { fetchDataFromFirestore } from "../Firebase/configFirebase";

const Home = () => {
  const [dataFromFirestore, setDataFromFirestore] = useState([]);

  useEffect(() => {
    // Llama a fetchDataFromFirestore para obtener los datos
    fetchDataFromFirestore()
      .then((data) => {
        setDataFromFirestore(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de Firestore: ", error);
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
