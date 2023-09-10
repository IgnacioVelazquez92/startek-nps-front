import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { routes } from "./Routes/routes";
import RootLayout from "./Layout/RootLayout";
import UserContext from "./context/userContext";
import Abncontext from "./context/Abncontext";
import LiderContext from "./context/LiderContext";
import AgentContext from "./context/AgentContext";
import("./App.css");
import("react-datepicker/dist/react-datepicker.css");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {routes.map(({ path, Element, index }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Route>
  )
);

function App() {
  const [user, setUser] = useState(null);
  const [cliente, setCliente] = useState({ email: "", encuestas: [] });
  const [lider, setLider] = useState({
    liderU: "",
    liderEncuestas: [],
    selectedDates: {
      fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDate: new Date(),
    },
  });
  const [agente, setAgente] = useState({
    agenteU: "",
    agenteEncuestas: [],
    selectedDates: {
      fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDate: new Date(),
    },
  });
  const [cuenta, setCuenta] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <LiderContext.Provider value={{ lider, setLider }}>
          <AgentContext.Provider value={{ agente, setAgente }}>
            <Abncontext.Provider value={{ cliente, setCliente }}>
              <RouterProvider router={router} />
            </Abncontext.Provider>
          </AgentContext.Provider>
        </LiderContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
