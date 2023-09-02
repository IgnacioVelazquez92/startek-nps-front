import React, { useEffect, useState } from "react";
import { fetchImagesFromFirestore } from "../Firebase/configFirebase";

const Carrusel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Cargar las imágenes almacenadas en Firestore cuando el componente se monta
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const imagesData = await fetchImagesFromFirestore(); // Función para obtener las imágenes desde Firestore
      setImages(imagesData);
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
    }
  };

  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={image.imageURL}
              className="d-block w-100"
              alt={image.title}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carrusel;
