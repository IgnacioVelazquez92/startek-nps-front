import DatePicker from "react-datepicker";
import React, { useState, useEffect, useContext } from "react";
import { ApiClient } from "../../api/services";
import Loader from "../Loader/Loader";
import CalculoNPS from "../Charts/CalculoNPS";
import TablaAgentes from "./TablaAgentes";
import NpsByDay from "./NpsByDay";
import LiderContext from "../../context/LiderContext";

const SearchLider = () => {
  const apiClient = new ApiClient();
  const { lider, setLider } = useContext(LiderContext);

  const [loading, setLoading] = useState(false);

  const handleDateChange = (date, name) => {
    setLider({
      ...lider,
      selectedDates: {
        ...lider.selectedDates,
        [name]: date,
      },
    });
  };

  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-lg-flex flex-wrap justify-content-center my-3"
      >
        <div className="row g-3">
          <div className="col">
            <DatePicker
              selected={lider.selectedDates.fromDate || firstDayOfMonth}
              onChange={(date) => handleDateChange(date, "fromDate")}
              selectsStart
              dateFormat="dd/MM/yyyy"
              isClearable
              placeholderText="Desde"
              className="me-3 mb-2 rounded py-1 form-control form-control-lg"
            />
          </div>
          <div className="col">
            <DatePicker
              selected={lider.selectedDates.toDate || new Date()}
              onChange={(date) => handleDateChange(date, "toDate")}
              selectsEnd
              dateFormat="dd/MM/yyyy"
              isClearable
              placeholderText="Hasta"
              className="mb-2 rounded py-1 form-control form-control-lg"
            />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-9">
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
      <CalculoNPS data={lider.liderEncuestas} />
      {lider.liderEncuestas && lider.liderEncuestas.length !== 0 && (
        <TablaAgentes encuestas={lider.liderEncuestas} />
      )}
      <h3 className="my-3 text-center">NPS por día</h3>
      {lider.liderEncuestas && <NpsByDay encuestas={lider.liderEncuestas} />}
    </>
  );
};

export default SearchLider;
