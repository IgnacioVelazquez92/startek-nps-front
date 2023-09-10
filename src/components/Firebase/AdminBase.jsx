import React, { useState } from "react";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

function AdminBase() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("excelFile", file);

      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}/base-encuestas`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.status === 200) {
          const responseData = await response.json(); // Esto extrae el contenido JSON de la respuesta
          console.log(responseData);

          // Si la solicitud es exitosa, muestra un SweetAlert de éxito
          Swal.fire({
            icon: "success",
            title: "Archivo cargado con éxito",
            text: `Se guardaron encuestas ${responseData.encuestasGuardadas} nuevas, el resto se ignoro`,
          });
        } else {
          // Si la solicitud no es exitosa, muestra un SweetAlert de error
          Swal.fire({
            icon: "error",
            title: "Error al cargar el archivo",
            text: "Ocurrió un error al cargar el archivo. Por favor, inténtalo nuevamente.",
          });
        }
      } catch (error) {
        console.error("Error al cargar el archivo:", error);

        Swal.fire({
          icon: "error",
          title: "Error al cargar el archivo",
          text: "Ocurrió un error al cargar el archivo. Por favor, inténtalo nuevamente.",
        });
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No se ha seleccionado ningún archivo.");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-11 col-md-8 col-lg-7">
        <h2 className="text-center">Cargar base nueva</h2>
        <input
          type="file"
          accept=".xls, .xlsx"
          onChange={handleFileChange}
          className="form-control"
          required
        />
        <button
          onClick={handleUpload}
          className="btn btn-block btn-success mt-2"
        >
          Cargar
        </button>
        {loading && <Loader className="mx-auto" />}
      </div>
    </div>
  );
}

export default AdminBase;
