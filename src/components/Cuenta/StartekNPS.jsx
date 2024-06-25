import { useState, useContext } from "react";
import { ApiClient } from "../../api/services";
import Loader from "../Loader/Loader";
import LineChartDay from "../Charts/LineChartDay";
import CuentaContext from "../../context/CuentaContext";
import InputsFecha from "../generals/InputsFecha";
import EquipoNPS from "../generals/EquipoNPS";

const EncuestasPorMes = () => {
  const { cuenta, setCuenta } = useContext(CuentaContext);
  const [loading, setLoading] = useState(false);
  const apiClient = new ApiClient();

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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  const filtrosXdsl = [
    { key: "VAG", value: "VAG_RICMC_ESPECIALIZADA_XDSL_AEGIS_QC1S1" },
  ];
  const filtrosCustomer = [
    {
      key: "VAG",
      value: [
        "VAG_RICMC_CARE_COMBO-CM_SC2-5_OPEN_AEGIS_QC1S1",
        "VAG_RICMC_CARE_COMBO-CM_SC2-5_FAN_AEGIS_QC1S1",
        "VAG_RICMC_CARE_CATV_SC2-5_FAN_AEGIS_QC1S1",
      ],
    },
  ];
  const filtrosFija = [{ key: "VAG", value: "VAG_RIFMC_INTEG_AEGIS_QC1S1" }];

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-md-center my-3">
        <InputsFecha context={cuenta} setContext={setCuenta} />
        <div className="d-flex justify-content-center align-items-center">
          <button
            onClick={getEncuestasPorRangoFechas}
            className="btn btn-outline-primary btn-lg ms-2"
          >
            Calcular
          </button>
        </div>
      </div>

      {loading && <Loader className="mx-auto" />}
      {cuenta.cuentaEncuestas.length !== 0 && (
        <EquipoNPS
          encuestas={cuenta.cuentaEncuestas}
          pivotKey="LIDER"
          filters={filtrosXdsl}
          title={"XDSL"}
        />
      )}
      {cuenta.cuentaEncuestas.length !== 0 && (
        <EquipoNPS
          encuestas={cuenta.cuentaEncuestas}
          pivotKey="LIDER"
          filters={filtrosCustomer}
          title={"Customer"}
        />
      )}
      {cuenta.cuentaEncuestas.length !== 0 && (
        <EquipoNPS
          encuestas={cuenta.cuentaEncuestas}
          pivotKey="LIDER"
          filters={filtrosFija}
          title={"Fija Integral"}
        />
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
