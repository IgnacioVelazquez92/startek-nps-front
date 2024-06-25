import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

// Registrar el locale
registerLocale("es", es);

const InputsFecha = ({ context, setContext }) => {
  const handleDateChange = (date, name) => {
    setContext({
      ...context,
      selectedDates: {
        ...context.selectedDates,
        [name]: date,
      },
    });
  };

  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      <DatePicker
        selected={context.selectedDates?.fromDate || firstDayOfMonth}
        onChange={(date) => handleDateChange(date, "fromDate")}
        selectsStart
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText="Desde"
        className="mx1 rounded py-1 form-control form-control-lg"
        locale="es"
      />
      <DatePicker
        selected={context.selectedDates?.toDate || new Date()}
        onChange={(date) => handleDateChange(date, "toDate")}
        selectsEnd
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText="Hasta"
        className="me-2 rounded py-1 form-control form-control-lg"
        locale="es"
      />
    </div>
  );
};

export default InputsFecha;
