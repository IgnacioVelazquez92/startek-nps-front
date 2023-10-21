import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ApiClient } from "../../api/services";
import CalculoNPS from "../Charts/CalculoNPS";
import Loader from "../Loader/Loader";
import LineChartDay from "../Charts/LineChartDay";
import TablaLider from "./TablaLider";
import CuentaContext from "../../context/CuentaContext";

const EncuestasPorMes = () => {
  const { cuenta, setCuenta } = useContext(CuentaContext);
  const [loading, setLoading] = useState(false);
  const apiClient = new ApiClient();

  const handleDateChange = (date, name) => {
    setCuenta({
      ...cuenta,
      selectedDates: {
        ...cuenta.selectedDates,
        [name]: date,
      },
    });
  };

  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const getEncuestasPorRangoFechas = async () => {
    // Verificar que ambas fechas estén seleccionadas
    if (!cuenta.selectedDates.fromDate || !cuenta.selectedDates.toDate) return;
    setLoading(true);

    try {
      const objetoFecha = {
        desde: cuenta.selectedDates.fromDate.toISOString(),
        hasta: cuenta.selectedDates.toDate.toISOString(),
      };
      const response = await apiClient.getNpsbyDate(objetoFecha);
      setCuenta({
        ...cuenta,
        cuentaEncuestas: response.data,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const formatDate = (date) => {
  //   // Obtener el día, mes y año de la fecha y formatearla como "dd/MM/yyyy"
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const formattedDate = `${day}/${month}/${date.getFullYear()}`;
  //   return formattedDate;
  // };

  const calculateNPSByDay = () => {
    // Agrupar las encuestas por día
    const groupedEncuestas = cuenta.cuentaEncuestas.reduce(
      (result, encuesta) => {
        const fecha = new Date(encuesta.Fecha).toISOString().slice(0, 10); // Extraer solo la parte de la fecha (sin la hora)
        if (!result[fecha]) {
          result[fecha] = [];
        }
        result[fecha].push(encuesta);
        return result;
      },
      {}
    );

    // Calcular el NPS para cada día y guardar el resultado en un array
    const npsPorDia = [];
    for (const fecha in groupedEncuestas) {
      const promotores = groupedEncuestas[fecha].filter(
        (encuesta) => encuesta.NPS_Calification >= 9
      ).length;
      const detractores = groupedEncuestas[fecha].filter(
        (encuesta) => encuesta.NPS_Calification <= 6
      ).length;
      const totalRespuestas = groupedEncuestas[fecha].length;
      const nps = ((promotores - detractores) / totalRespuestas) * 100;
      npsPorDia.push({ fecha, nps, totalRespuestas });
    }

    return npsPorDia;
  };

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-md-center my-3">
        <div className="d-flex justify-content-center gap-3">
          <DatePicker
            selected={cuenta.selectedDates.fromDate || firstDayOfMonth}
            onChange={(date) => handleDateChange(date, "fromDate")}
            selectsStart
            dateFormat="dd/MM/yyyy"
            isClearable
            placeholderText="Desde"
            className="me-2 mb-2 rounded py-1 form-control  form-control-lg"
          />
          <DatePicker
            selected={cuenta.selectedDates.toDate || new Date()}
            onChange={(date) => handleDateChange(date, "toDate")}
            selectsEnd
            dateFormat="dd/MM/yyyy"
            isClearable
            placeholderText="Hasta"
            className="me-2 mb-2 rounded py-1 form-control form-control-lg"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            onClick={getEncuestasPorRangoFechas}
            className="btn btn-outline-primary btn-lg ms-2 mb-2"
          >
            Calcular
          </button>
        </div>
      </div>

      {loading && <Loader className="mx-auto" />}
      {cuenta.cuentaEncuestas && <CalculoNPS data={cuenta.cuentaEncuestas} />}
      {cuenta.cuentaEncuestas.length !== 0 && (
        <TablaLider encuestas={cuenta.cuentaEncuestas} />
      )}
      {cuenta.cuentaEncuestas && (
        <div className="d-flex row justify-content-center px-2 mx-0">
          <div className="col-11 mx-0 px-0">
            <h2 className="text-center my-3">NPS por día</h2>
            <LineChartDay data={calculateNPSByDay()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EncuestasPorMes;
