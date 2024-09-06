import React, { useState, useEffect, useContext } from "react";
import { ApiClient } from "../../api/services";
import Loader from "../Loader/Loader";
import NpsByDay from "./NpsByDay";
import LiderContext from "../../context/LiderContext";
import InputsFecha from "../generals/InputsFecha";
import EquipoNPS from "../generals/EquipoNPS";

const SearchLider = () => {
  const apiClient = new ApiClient();
  const { lider, setLider } = useContext(LiderContext);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLider({
      ...lider,
      liderU: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Verificar que ambas fechas estén seleccionadas
    if (!lider.selectedDates.fromDate || !lider.selectedDates.toDate) return;

    setLoading(true);

    try {
      const fechaYU = {
        desde: lider.selectedDates.fromDate.toISOString(),
        hasta: lider.selectedDates.toDate.toISOString(),
        U_LIDER: lider.liderU,
      };

      const response = await apiClient.getNpsbyDateAndULider(fechaYU);
      setLider({
        ...lider,
        liderEncuestas: response.data,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        "VAG_RICMC_CARE_FACT_SC2-5_FAN_AEGIS_QC1S1",
      ],
    },
  ];
  const filtrosFija = [{ key: "VAG", value: "VAG_RIFMC_INTEG_AEGIS_QC1S1" }];

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-lg-flex flex justify-content-center my-3"
      >
        <div className="row g-3">
          <div className="col-6">
            <InputsFecha context={lider} setContext={setLider} />
          </div>
          <div className="col-3">
            <input
              type="text"
              value={lider.liderU}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="Ingresa tu usuario U"
              aria-label="Ingresa tu usuario-u"
              pattern="^(u|U)\d{6}$"
              required
            />
          </div>
          <div className="col-3">
            <button type="submit" className="btn btn-outline-primary btn-lg">
              Calcular
            </button>
          </div>
        </div>
      </form>
      {loading && <Loader className="mx-auto" />}

      {lider.liderEncuestas && lider.liderEncuestas.length !== 0 && (
        <EquipoNPS
          encuestas={lider.liderEncuestas}
          pivotKey="RAC"
          filters={filtrosXdsl}
          title={"XDSL"}
          usuarioU="UsuarioU"
        />
      )}
      {lider.liderEncuestas && lider.liderEncuestas.length !== 0 && (
        <EquipoNPS
          encuestas={lider.liderEncuestas}
          pivotKey="RAC"
          filters={filtrosCustomer}
          title={"Customer"}
          usuarioU="UsuarioU"
        />
      )}
      {lider.liderEncuestas && lider.liderEncuestas.length !== 0 && (
        <EquipoNPS
          encuestas={lider.liderEncuestas}
          pivotKey="RAC"
          filters={filtrosFija}
          title={"Fija Integral"}
          usuarioU="UsuarioU"
        />
      )}
      <h3 className="my-3 text-center">NPS por día</h3>
      {lider.liderEncuestas && <NpsByDay encuestas={lider.liderEncuestas} />}
    </>
  );
};

export default SearchLider;
