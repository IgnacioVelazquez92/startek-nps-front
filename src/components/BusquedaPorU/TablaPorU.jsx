import React from 'react';
import { format } from "date-fns";


const TablaDatos = ({ encuestas }) => {

  // Función para formatear la fecha en formato "MM/DD/YYYY" a "DD/MM/YYYY"

  const formatFecha = (fechaString) => {
    // Crea el objeto Date desde la cadena de fecha
    const fechaObj = new Date(fechaString);
    
    // Formatea la fecha usando date-fns
    const formattedDate = format(fechaObj, "dd/MM/yyyy");
    
    return formattedDate;
  };

  return (
    <div className='my-2 container'>
      {
        <table className={"table table-hover my-3 responsive container table-bordered"}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Nota</th>
              <th>Calificación</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            {encuestas.map((encuesta) => (
              
              <tr key={encuesta._recordId}>
                <td>{encuesta.UsuarioU}</td>
                <td>{formatFecha(encuesta.Fecha)}</td>
                <td>{encuesta.NPS_Calification}</td>
                <td>{encuesta.NPS_GROUP}</td>
                <td>{encuesta.Opinion}</td>
              </tr>
              
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default TablaDatos;

