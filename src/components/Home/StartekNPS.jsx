import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ApiClient } from '../../api/services';

const EncuestasPorMes = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date()); // Establecer "hasta" como el día de hoy por defecto

  const handleDateChange = (date, field) => {
    if (field === 'from') {
      setStartDate(date);
    } else if (field === 'to') {
      setEndDate(date);
    }
  };

  const getEncuestasPorRangoFechas = () => {
    // Verificar que ambas fechas estén seleccionadas
    if (!startDate || !endDate) return;

    // Obtener el rango de fechas como "desde" y "hasta" en formato MM/DD/YYYY
    const fromDate = formatDate(startDate);
    const toDate = formatDate(endDate);

    console.log(startDate,endDate );

    // Realizar la petición a tu backend con el rango de fechas seleccionado
    // Aquí debes utilizar la función de tu librería de peticiones HTTP, como fetch o axios
    // Por ejemplo:
    // fetch(`/api/encuestas?desde=${fromDate}&hasta=${toDate}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Aquí puedes manejar los datos recibidos y actualizar el estado de tu componente
    //   })
    //   .catch((error) => {
    //     // Manejar el error si la petición falla
    //   });
  };

  const formatDate = (date) => {
    // Obtener el mes y día de la fecha y formatearla como "MM/DD/YYYY"
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${month}/${day}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div>
      <h1 className='text-center'>Encuestas por Rango de Fechas</h1>
      <div className='d-flex justify-content-center align-items-center'>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleDateChange(date, 'from')}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          isClearable
          placeholderText="Desde"
          className='me-2 rounded py-1'
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => handleDateChange(date, 'to')}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
          isClearable
          placeholderText="Hasta"
          className='me-2 rounded py-1'

        />
      <button onClick={getEncuestasPorRangoFechas} className="btn btn-outline-primary ">Buscar</button>
      </div>
      {/* Agrega un botón para hacer la búsqueda */}
      {/* Aquí puedes mostrar las encuestas filtradas */}
    </div>
  );
};

export default EncuestasPorMes;