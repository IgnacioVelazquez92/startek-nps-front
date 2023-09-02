import React, { useState, useEffect } from "react";
import {
  storage,
  saveImageDetailsToFirestore,
  uploadImg,
  deleteImageFromFirestore,
  fetchImagesFromFirestore,
} from "../Firebase/configFirebase";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

const CarouselAdmin = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    setLoading(true);
    try {
      const imageDownloadURL = await uploadImg(file);
      const imageDetails = {
        title,
        imageURL: imageDownloadURL,
      };

      await saveImageDetailsToFirestore(imageDetails);

      setFile(null);
      setTitle("");

      // Recargar la lista de imágenes después de cargar una nueva
      fetchImages();

      Swal.fire({
        icon: "success",
        title: "Realizado",
        text: "Se cargó con éxito",
      });
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteImageFromFirestore(imageId); // Función para eliminar una imagen desde Firestore

      // Recargar la lista de imágenes después de eliminar una
      fetchImages();

      Swal.fire({
        icon: "success",
        title: "Realizado",
        text: "Imagen eliminada con éxito",
      });
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al eliminar la imagen.",
      });
    }
  };

  return (
    <div>
      <h2 className="text-center">
        Formulario de Carga de Imagen en el carrusel
      </h2>
      <form onSubmit={handleUpload} className="container px-5">
        <div className="mb-3">
          <label htmlFor="imageInput" className="form-label">
            Seleccione una imagen debe ser formato webp
          </label>
          <input
            type="file"
            className="form-control"
            id="imageInput"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="titleInput" className="form-label">
            Título de la imagen (opcional)
          </label>
          <input
            type="text"
            className="form-control"
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cargar Imagen
        </button>
      </form>
      {loading && <Loader />}

      <h2 className="text-center mt-4">Imágenes Cargadas</h2>
      <div className="d-flex gap-3 flex-wrap">
        {images.map((image) => (
          <div key={image.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <img
                src={image.imageURL}
                className="card-img-top"
                alt={image.title}
              />
              <div className="card-body">
                <h5 className="card-title">{image.title}</h5>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselAdmin;
