import React, { useState, useEffect, useContext } from "react";
import { saveDataToFirestore, uploadFile } from "./configFirebase";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import UserContext from "../../context/userContext";

const BuenasPracticas = () => {
  const [segmento, setSegmento] = useState("Continuidad");
  const [titulo, setTitulo] = useState("");
  const [importancia, setImportancia] = useState("");
  const [tips, setTips] = useState("");
  const [idLlamado, setIdLlamado] = useState("");
  const [nombreAgente, setNombreAgente] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataFromFirestore, setDataFromFirestore] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [editingDataId, setEditingDataId] = useState(null); // Nuevo estado para la ID de edición

  const { user } = useContext(UserContext);

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (archivo) {
      try {
        const downloadURL = await uploadFile(archivo);

        const data = {
          segmento,
          titulo,
          importancia,
          tips,
          idLlamado,
          nombreAgente,
          archivoURL: downloadURL,
          nombreLider: user.name,
          fecha: serverTimestamp(),
        };

        if (!editingDataId) {
          // Si no hay una ID de edición, crea un nuevo registro
          await saveDataToFirestore(data);
        } else {
          // Si hay una ID de edición, actualiza el registro existente
          const { id, nombreLider, ...updatedData } = data;
          const db = getFirestore();
          const documentRef = doc(db, "buenas_practicas", editingDataId);
          await updateDoc(documentRef, updatedData);
        }

        Swal.fire({
          icon: "success",
          title: "Realizado",
          text: "Se cargó con éxito",
        });
      } catch (error) {
        console.error("Error uploading file: ", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      } finally {
        setLoading(false);
        setSegmento("Continuidad");
        setTitulo("");
        setImportancia("");
        setTips("");
        setIdLlamado("");
        setNombreAgente("");
        setArchivo(null);
        setEditingData(null);
        setEditingDataId(null);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const collectionRef = collection(db, "buenas_practicas");
      const querySnapshot = await getDocs(collectionRef);

      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setDataFromFirestore(data);
    };

    fetchData();
  }, []);

  const handleEdit = (data) => {
    setSegmento(data.segmento);
    setTitulo(data.titulo);
    setImportancia(data.importancia);
    setTips(data.tips);
    setIdLlamado(data.idLlamado || "");
    setNombreAgente(data.nombreAgente || "");
    setEditingData(data);
    setEditingDataId(data.id); // Establece la ID de edición
  };

  const handleDelete = async (data) => {
    try {
      const db = getFirestore();
      const documentRef = doc(db, "buenas_practicas", data.id);

      await deleteDoc(documentRef);

      setDataFromFirestore(
        dataFromFirestore.filter((item) => item.id !== data.id)
      );

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Registro eliminado correctamente.",
      });
    } catch (error) {
      console.error("Error al eliminar el registro: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al eliminar el registro.",
      });
    }
  };

  return (
    <div className="container p-5">
      <h2 className="text-center">Registro de Buenas prácticas</h2>

      <form className="px-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="segmento" className="form-label">
            Segmento
          </label>
          <select
            className="form-select"
            id="segmento"
            value={segmento}
            onChange={(e) => setSegmento(e.target.value)}
            required
          >
            <option value="Continuidad">Continuidad</option>
            <option value="Encuesta">Encuesta</option>
            <option value="Clientes sin servicio Prolongado">
              Clientes sin servicio Prolongado
            </option>
            <option value="Manejo de objeciones">Manejo de objeciones</option>
            <option value="Detractor frecuente">Detractor frecuente</option>
            <option value="Agendas">Agendas</option>
            <option value="Agendas">Sondeo</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="importancia" className="form-label">
            Importancia
          </label>
          <textarea
            className="form-control"
            id="importancia"
            rows="3"
            value={importancia}
            onChange={(e) => setImportancia(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tips" className="form-label">
            Tips
          </label>
          <textarea
            className="form-control"
            id="tips"
            rows="3"
            value={tips}
            onChange={(e) => setTips(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="idLlamado" className="form-label">
            ID del llamado
          </label>
          <input
            type="text"
            className="form-control"
            id="idLlamado"
            value={idLlamado}
            onChange={(e) => setIdLlamado(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombreAgente" className="form-label">
            Nombre del agente
          </label>
          <input
            type="text"
            className="form-control"
            id="nombreAgente"
            value={nombreAgente}
            onChange={(e) => setNombreAgente(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="archivo" className="form-label">
            Audio Modelo
          </label>
          <input
            type="file"
            className="form-control"
            id="archivo"
            accept="audio/mp3"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingData ? "Guardar Cambios" : "Enviar"}
        </button>
      </form>

      {loading && <Loader />}
      <hr />
      <h2 className="my-4 text-center">Registros existentes</h2>
      <div className="container my-3 px-5 d-flex gap-3 flex-wrap">
        {dataFromFirestore.map((item) => (
          <div className="pdftips" key={item.id}>
            <h2 className="pdftips__titulo">{item.titulo}</h2>
            <div className="tips__cuerpo">
              <div className="pdftips__body">
                <p className="tips__importancia">{item.importancia}</p>
                <p className="tips__speech">{item.tips}</p>
                <hr />
                <p className="m-0 p-0">{item.idLlamado}</p>
                <p className="m-0 p-0">{item.nombreAgente}</p>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-2 py-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="btn btn-primary me-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="pdftips__footer my-0">
              Agregado por {item.nombreLider} hace{" "}
              {calculateTimeDifference(item.fecha.toDate())}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuenasPracticas;

export function calculateTimeDifference(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} día(s)`;
  } else if (hours > 0) {
    return `${hours} hora(s)`;
  } else if (minutes > 0) {
    return `${minutes} minuto(s)`;
  } else {
    return `${seconds} segundo(s)`;
  }
}
